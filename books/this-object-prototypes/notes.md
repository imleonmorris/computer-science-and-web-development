# Notes related to what I learned while completing this YDKJS: `this` & Object Prototypes

## Chapter 1: this Or That?

`this` is actually quite a simple mechanism to get our heads around.

#### Why `this`?

Why is `this` useful?

```js
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call( this );
    console.log( greeting );
}

var me = {
    name: "Leon"
};

var you = {
    name: "Reader"
};

identify.call( me ); // LEON
identify.call( you ); // READER

speak.call( me ); // Hello, I'm LEON
speak.call( you ); // Hello, I'm READER
```

I could pass context as an explicit parameter but that is much messier than using a `this` context, especially when the usage patterns becomes more and more complex.

#### Confusions

##### Itself

* `this` does **not** refer to itself.

```js
function foo(num) {
    console.log( "foo: " + num );

    // keep track of how many times `foo` is called
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?
```

`console.log` clearly shows that `foo(..)` was called four times but `foo.count` is `0`!.

`foo.count` is still `0`, even though the four `console.log` statements clearly indicate `foo(..)` was in fact called four times. The frustration stems from a *too literal* interpretation of what `this` (in `this.count++`) means.

It is possible to hack together a different solution to deal with the any problems (many devs prefer to fall back on lexcical scope). However, this is ignoring the problem.

We can solve it by forcing `this` to point at the `foo` function object:

```js

function foo(num) {
    console.log( "foo: " + num );

    // keep track of how many times `foo` is called
    // Note: `this` IS actually `foo` now, based on
    // how `foo` is called (see below)
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        // using `call(..)`, we ensure the `this`
        // points at the function object (`foo`) itself
        foo.call( foo, i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

##### Its Scope

* The second confusion is that `this` refers to its function scope. It is actually a bit true but not entirely.

**`this` does not refer to a function's lexical scope**

It is impossible to create a bridge between two functions, say `foo()` and `bar()`. You cannot use a `this` reference to look something up in a lexical scope.


#### What's this?

So what is `this`?

> We said earlier that this is not an author-time binding but a runtime binding. It is contextual based on the conditions of the function's invocation. this binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.

#### Review (TL;DR)

`this` binding is a consistent source of confusion for JavaScript developers.

`this` is neither a reference to the function itself, nor is it a refernce to the function's *lexical* scope.

`this` is a binding which is made when a function is invoked, and *what* it references determines entirely the call-site where the the function is called.

## Chapter 2: this All Makes Sense Now!


#### Call-site

It's useful to distinguish between the *call-site* and the *call-stack*.

**We can think of the call-stack as the stack of functions that have been called to get us to the current moment in execution**

e.g.

```js

function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`

```

It's possible to visualise call-stacks using browser debuggers. Get the call-stack and then find the second item from the top (that will show you the real call-site).


#### Nothing But Rules

When inspecting the call-site, it is necessary to determine which of four rules apply. It depends how the function is called. Multiple rules *could* apply.

##### Default Binding

The standalone function invocation.

* Variables declared in the global scope are synonymous with global-object properties of the same name. They're the same thing.

* In the default binding, `this` applies to the function call, and points `this` to the global object.

How do we know the *default binding* exists? When no other rules apply, the *default binding* applies instead.

```js
function foo() {
    console.log( this.a );
}

var a = 2;

foo(); // 2
```

In strict mode, the global object is not eligble for *default binding* and `this` is set to `undefined`.

```js
function foo() {
    "use strict";

    console.log( this.a );
}

var a = 2;

foo();  // TypeError: `this` is `undefined`.
```

However... even though `this` binding rules are based on the call-site, the `strict mode` state of the call-site is irrelevant. It's the function itself that matters.

```js
function foo() {
    console.log( this.a );
}

var a = 2;

(function() {
    "use strict";

    foo();  // 2
})();
```

**NB:** Care must be taken over mixing strict mode and non-strict mode.

##### Implicit Binding

The second rule considers this: does the call-site have a context object (containing object)?

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2
```

Firstly, look how `foo()` is declared (then later added as a reference property onto `obj`).

Regardless of whether `foo()` is initially declared *on* `obj`, or is added as a reference later (as this snippet shows), in neither case is the **function** really "owned" or "contained" by the `obj` object. However, the call-site *uses* the `obj` context to **reference** the function, so you could say that the obj object "owns" or "contains" the **function reference** at the time the function is called.

At the point that `foo()` is called, it's preceded by an object reference to `obj`. When there is a context object for a function reference, the *implicit binding* rule says that it's *that* object which should be used for the function call's `this` binding.

Because `obj` is the `this` for the `foo()` call, `this.a` is synonymous with `obj.a`.

Note: the top/last level of an object property reference chain matter to the call-site.

NB: Order matters:

```js
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo();    // 42
```

###### Implicitly Lost

An *implicitly-bound* function can lose its binding - and then falls back to the *default binding* (of either the global object or `undefined`, depending on `strict mode`).

##### Explicit Binding

When you force a function to use a particular object for the `this` binding, without putting a property function reference on the object.

We use `call(..)` or `apply(..)`.

Their first parameter is the object used for `this`, then the function is invoked with that `this` specified. Directly stating what the `this` will be is why it is *explicit binding*.

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj );    // 2
```

**NB:** *explicit binding* doesn't offer a solution when a function 'loses' its intended `this` binding. But a *hard binding* can...

###### Hard Binding

Observe:

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call( obj );
};

bar();  // 2
setTimeout( bar, 100 ); // 2

// `bar hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```

1. A function `bar()` is declared
2. Internally, foo.call(obj) is called.
3. This forcibly invokes `foo` with `obj` binding for `this`.
4. It doesn't matter how `bar` is later invoked, it will manually invoke `foo` with `obj`.

It's useful when creating a pass-thru of any arguments passed and any return values received.

Since *hard binding* is such a common pattern, the built-in utility `function.prototype.bind` can be used:

```js
function foo(something) {
    console.lof( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 );       //  2 3
console.log( b );       // 5

###### API Call "Contexts"

An optional parameter, "context", can be used which is designed as a work-around to not use `bind(..)`. This ensures a callback function uses a particular `this`.

E.g.

```js
function foo(el) {
    console.log( el, this.id);
}

var obj = {
    id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj );  // 1 awesome 2 awesome 3 awesome

##### `new` Binding

Any function can be called with `new` in front of it. There is no such thing as "constructor functions" - they are **constuction calls *of* functions**.

When a function is invoked with `new` (a constructor call):

1. a brand new object is created (aka, constructed) out of thin air
2. the newly constructed object is [[Prototype]]-linked
3. the newly constructed object is set as the `this` binding for that function call
4. unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.

```js
function foo(a) {
    this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

#### Everything In Order

There is an *order* of precendence when multiple rules apply.

###### Test between *implicit* and *explicit* binding:

```js
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 );  // 3
obj2.foo.call( obj1 );  // 2
```

###### Test between *`new`* and *implicit* binding:

```js
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a );  // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a );  // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a );  // 2
console.log( bar.a );   // 4
```

###### Test between *`new`* and *explicit* binding

**NB:** it is not possible to use `new` with `call(..)` so let's test with *hard binding*.

We would also expect hard binding to be irreversable (it's like a hard shell!):

```js
function foo (something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a );  // 2

var baz = new bar( 3 );
console.log( obj1.a );  // 2
console.log( baz.a );   // 3
```

#### Binding Exceptions

1. Ignored `this` - using `null` or `undefined` as a `this` binding parameter.
2. Safer `this` - passing a specifically setup object for `this`.
3. Indirection - *default binding* applies when using indirect references e.g. `p.foo = o.foo`.
4. Softening Binding - *hard binding* is rather inflexible for a function. Using `softBind(..)` and a pre-specified, alternate *default* (`obj`):

```js
function foo() {
    console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" },

var fooOBJ = foo.softBind( obj );

fooOBJ();   // name: obj2   <----- look!!

fooOBJ.call( obj3 );    // name: obj3   <----- look!!

setTimeout( obj2.foo, 10);  // name: obj   <----- falls back to soft-binding.
```

#### Lexical `this`

ES6 introduces arrow-function - this is a special function that does not use the four rules.

Arrow-functions use the `=>` operator. They adopt the `this` binding from the enclosing (function of global) scope.

```js
function foo() {
    // return an arrow function
    return (a) => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 );   // 2, not 3!
```

#### Review (TL;DR)

Determining the `this` binding for an executing function requires finding the direct call-site of that function. Once examined, four rules can be applied to the call-site, in *this* order of precedence:

1. Called with `new`? Use the newly constructed object.
2. Called with `call` or `apply` (or `bind`)? Use the specified object.
3. Called with a context object owning the call? Use that context object.
4. Default: `undefined` in `strict mode`, global object otherwise.

Be careful of accidental/unintentional invoking of the default binding rule. In cases where you want to "safely" ignore a `this` binding, a "DMZ" object like `ø = Object.create(null)` is a good placeholder value that protects the `global` object from unintended side-effects.

Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for `this` binding, which means they adopt the this binding (whatever it is) from its enclosing function call. They are essentially a syntactic replacement of self = this in pre-ES6 coding.

## Chapter 3: Objects


#### Syntax

There are two forms:

1. declarative (literal) - most common and easiest to use.
2. constructed - rare to use this. Values added one at a time.

Literal:

```js
var myObj = {
    key: value
    // ...
};
```

Constructed:

```js
var myObj = new Object();
myObj.key = value;
```

#### Type

Objects are one of 6 primary types: `string`, `number`, `boolean`, `null`, `undefined`, `object`.

*NOT EVERYTHING IN JS IS AN OBJECT*.

There a few special object sub-types, referred to as *complex primitives*. These are `function` and arrays.

##### Built-in Objects

These are not necessarily related to their simple primitive counter-parts:

- `String`
- `Number`
- `Boolean`
- `Object`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Error`

It is advised to use the literal form for a value and not the constructed object form.

#### Contents

Property names are stored in an object container and technically, they *point* to where values are stored.

Two ways of accessing the *location* of a property value:

1. `.` operator - referred to as "property" access
2. `[".."]` operator - referred to as "key" access

In objects, property names are **always** strings.

##### Computed Property Names

ES6 addition where you can add an expression, surrounded by a `[ ]` pair, in the key-name position of an object-literal declaration:

```js

var prefix = "foo";

var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world

Usually quite useful for `Symbol`s.

##### Property vs. Method

Some developers make the distinction between *property access* and *method access* when the a property value happens to be a function. Author claims this is unhelpful as it is always property access regardless.

##### Arrays

Arrays assume *numeric indexing* - values are stored in location (indices), at non-negative integers.

##### Duplicating Objects

Should a copy be *shallow* or *deep*?

ES6 offers a potential answer:

1. `Object.assign(..)` takes a *target* object as its first parameter, and one or more *source* objects as its subsequent parameters.
2. It iterates over all the *enumerable*, *owned* keys (**immediately present**) on the *source* object(s) and copies them (via `=`) to *target*.
3. It returns *target*:

```js
var newObj = Object.assign( {}, myObject );

newObj.a;                       // 2
newObj.b === anotherObject;     // true
newObj.c === anotherArray;      // true
newObj.d === anotherFunction;   // true
```

##### Property Descriptors

Let's take the following:

```js
var myObject = {
    a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//      value: 2,
//      writable: true,
//      enumerable: true,
//      configurable: true
// }

```

A normal object property `a` is much more than its `value` of `2`.

It holds 3 other chracteristics:

1. `writable`
2. `enumerable`
3. `configurable`

It's possible to manually define one of the three by using `defineProperty(..)`.

###### Writable

**The ability to change the value of a property**

```js

var myObject = {
    a: 2
};

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: false,    // not writable!
    enumerable: true,
    configurable: true
} );

myObject.a = 3;

myObject.a;     // 2
```

Modification of the `value` silently failes. In `strict mode` this would show up a `TypeError`.

###### Configurable

**The ability to modify its descriptor definition using the same `defineProperty(..)` utility.**

This is a one-way action, and cannot be undone!

###### Enumerable

**Controls if a property will show up in certain object-property enumerations, such as the `for..in` loop.**

More on this later...

##### Immutability

Making properties or objects so that they cannot be changed. It is not terribly common but can be useful in some cases. You may want to reflect on your design patterns if they are relied upon heavily.

The following four approaches create *shallow* immutability.

###### Object Constant

By combining `writable: false` and `configurable: false`, we can essentially create a constant.

###### Prevent Extensions

To prevent new additional properties being added to an object, call `Object.preventExtensions(..)`

###### Seal

`Object.seal(..)` created a "sealed" object - it takes an existing object and essentially calls `Object.preventExtensions(..)` and sets all existing properties as `configurable: false`.

Not only can you not add any more properties you cannot reconfigure or delete existing ones (can still modify their values!).

###### Freeze

`Object.freeze(..)` creates a frozen object - takes an exsting object and essentially calls `Object.seal(..)`, but marks all "data accessor" properties as `writable:false`.

This is the highest level of immutability.

A 'deep freeze' could also be performed on an object by calling `Object.freeze(..)` then recursively iterating over all objects it references. Be careful though!

##### `[[Get]]`

Let's look at how property accesses are performed.

Take the following code:

```js
var myObject = {
    a: 2
};

myObject.a; // 2
```

The code is actually performing a `[[Get]]` operation on the `myObject`. It _first_ inspects the object for a property of the name `a` (if it finds it, will return th value), but will perform other stuff (chp 5) if not found.

If the property name doesn't exist, it can't make it up. It will return `undefined`. There's a bit more work into a search like `myObject.b // undefined` which we will see shortly. They are _literally_ the same output, and yet they are not.

##### `[[Put]]`

There is a bit of nuance with this one.

The the property is already present:

1. Is it an accessor descriptor? **Call the setter, if any**
2. Is it a data descriptor with `writable: false`? **Silently fail in `non-strict mode` or throw a `TypeError` in `strict mode`.
3. Otherwise, set value to the existing property as normal.

We will revisit for when the property is non-existent.

##### Getters & Setters

It's possible to override the default `[[Get]]` or `[[Put]]` operations per-property through the use of getters and setters. Once defined, these are then known as "accessor descriptors".

For these, the `value` and `writable` characteristics of the descriptor are moot and ignored. JS then considers the property characteristics as `set`, `get`, `configurable` and `enumerable`.

```js

var myObject = {
    // define a getter for `a`
    get a() {
        return 2;
    }
};

myObject.a = 3;

myObject.a;     // 2
```

Note above: _Even if_ there is a valid setter, the custom getter is hard-coded to return only `2`.

However, you'd almost certainly want to declare both a getter and a setter:

```js
var myObject = {
    // define a getter for `a`
    get a() {
        return this._a_;
    },

    // define a setter for `a`
    set a(val) {
        this._a_ = val * 2;
    }
};

myObject.a = 2;

myObject.a;     // 4
```

NB: `2` is stored in `_a_` and this is purely convention.

##### Existence

We can check to see if a property exists in an object using the `in` operator or `hasOwnProperty(..)`. However this second one doesnt consult the `[[Prototype]]` chain and just says if it's _in_ the object or not.

```js
var myObject = {
    a: 2
};

("a" in myObject);              // true
("b" in myObject);              // false

myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false
```

NB: `in` does not search for _values_ but actually _property names_.

###### Enumeration

```js
var myObject = { };

Object.defineProperty(
    myObject,
    "a",
    // make `a` enumerable, as normal
    { enumerable: true, value: 2 }
);

Object.defineProperty(
    myObject,
    "b",
    // make `b` NON-enumerable
    { enumerable: false, value: 3 }
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
    console.log( k, myObject[k] );
}
// "a" 2
```

The `in` operator _does_ seem to show property `b` - but the `for..in` loop **does not**.

NB: Best not to use `for..in` loops on arrays as it will show all numeric indices _and_ enumerable properties. Try to only use on traditional objects.

Could also use:

1. `propertyIsEnumerable(..)` - does property name exist _directly_ on object and is also `enumerable:true`.
2. `Object.keys(..)` - returns array of all enumerable properties.
3. `Object.getOwnPropertyNames(..)` - returns array of _all_ properties,  enumerable or not.

The last two _only_ inspect the direct object specified.

#### Iteration

A `for..in` loop iterates over the numeric indices of an array and returns the values assigned to each in one go.

Can use the following iteration helpers:

1. `forEach(..)` - iterates over all values and ignores any callback return values
2. `every(..)` - keeps going until the end _or_ the callback returns a `false` (falsy) value
3. `some(..)` - keeps going until the end _or_ the callback returns a `true` (truthy) value.

These act like a `break` statement.

If you want to iterate _directly_ over the values:

```js
var myArray = [ 1, 2, 3 ];

for (var v of my Array) {
    console.log( v );
}
// 1
// 2
// 3
```

Can also use the built-in `@@iterator`:

```js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();

it.next();  // {value:1, done:false }
it.next();  // {value:2, done:false }
it.next();  // {value:3, done:false } <-- This semantic will be discussed later
it.next();  // { done: true }

NB: `@@iterator` **is not the iterator object** itself but a **function that returns** the iterator object.

Can also create a custom `@@iterator`:

```js
var myObject = {
    a: 2,
    b: 3
};

Object.defineProperty( myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys( o );
        return {
            next: function() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
            }
        };
    }
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
    console.log( v );
}
// 2
// 3
```

This is a simple value-by-value iteration, but it can be more compelx. Combining with `for..of` make it much more powerful.

```js
var randoms = {
    [Symbol.iterator]: function() {
        return {
            next: function() {
                return { value: Math.random() };
            }
        };
    }
};

var randoms_pool = [];
for (var n of randoms) {
    randoms_pool.push( n );

    // don't proceed unbounded!
    if (randoms_pool.length === 100) break;
}
```

#### Review (TL;DR)

Objects in JS have both a literal form (such as `var a = { .. }`) and a constructed form (such as `var a = new Array(..)`). The literal form is almost always preferred, but the constructed form offers, in some cases, more creation options.

Many people mistakingly claim "everything in JavaScript is an object", but this is incorrect. Objects are one of the 6 (or 7, depending on your perspective) primitive types. Objects have sub-types, including function, and also can be behavior-specialized, like `[object Array]` as the internal label representing the array object sub-type.

Objects are collections of key/value pairs. The values can be accessed as properties, via `.propName` or `["propName"]` syntax. Whenever a property is accessed, the engine actually invokes the internal default `[[Get]]` operation (and `[[Put]]` for setting values), which not only looks for the property directly on the object, but which will traverse the `[[Prototype]]` chain (see Chapter 5) if not found.

Properties have certain characteristics that can be controlled through property descriptors, such as `writable` and `configurable`. In addition, objects can have their mutability (and that of their properties) controlled to various levels of immutability using `Object.preventExtensions(..)`, `Object.seal(..)`, and `Object.freeze(..)`.

Properties don't have to contain values -- they can be "accessor properties" as well, with getters/setters. They can also be either _enumerable_ or not, which controls if they show up in `for..in` loop iterations, for instance.

You can also iterate over **the values** in data structures (arrays, objects, etc) using the ES6 `for..of` syntax, which looks for either a built-in or custom `@@iterator` object consisting of a `next()` method to advance through the data values one at a time.


## Chapter 4: Mixing (Up) "Class" Objects

This chapter looks at:

- class orientation as a design pattern
- instatiation
- inheritance
- polymorphism

#### Class Theory

Class is essentially just a form of code organisation/architecture. A way of modelling real world problems.

It is stressed that data has intrinsic behaviours that operate on it, depending what it is. Proper design is to package up the data and behaviour together. Aka - _data structures_.

E.g. A word is usually a "string". The chracters are the data. But we don't just care about that, we want to _do stuff_. So the behaviours that can apply _to_ that data are designed as methods of a `String~ class.

Any given string is an instance of this class.

The relationship between `Vehicle` and `Car` is well documented.

The `Vehicle` is defined by all the stuff that is common to all (well, most) different types of vehicles. A `Car` _inherits_ the base definition from `Vehicle`. It is said to specialise the general `Vehicle` definition. Data in an instance would be things like the unique VIN of a specific car...

Thus: **classes, inheritance, instantiation**.

Polymorphism describes how a child class can override the general behaviour of its parent class - to give it more specifics. _Relative_ polymorphism lets us reference the base behaviour from the overridden behaviour.

##### "Class" Design Pattern

Languages such as Java make _everything_ a class. Other languages such as C/C++ or PHP give you both procedural and class-oriented syntaxes.

##### JavaScipt "Classes"

**JavaScript does not have classes**.

Classes are a design pattern and we can implement approximation for classical class functionality. However, despite the syntax of classes - the mechanisms that you build on operate quite differently.

Truth is, we're faking it in JS. Classes are an optional pattern in software design, and you have the choice to use them. This chapter looks more into classes - but JS does not have them.

#### Class Mechanics

##### Building

Metaphor for "class" and "instance" comes from a building construction.

Think blue-prints and copies of a building.

The blue-print is a class.

The copy is an instantiation. The end result is an object (an instance) - and and is described by the class.

**A class is instantiated into object form by a copy operation**.

##### Constuctor

Instances of classes are constructed by a special method of the class, usually of the same name as the class - called a _constructor_.

The constructor of a class _belongs_ to the class, almost universally with the same name. They pretty much always need to be called with `new`. This lets the engine know you want to construct a _new_ class instance.

#### Class Inheritance

You can define a class which can instantiate itself - but also define another class which **inherits** from the first class. This is said to be a "child class".

It's important to remember that we're talking about parent and child **classes** - which aren't physical things!

##### Polymorphism

This is the idea that any method can reference another method of a higher level of the inheritance hierarchy.

##### Multiple Inheritance

Some class-oriented languages allow you to specify more than one "parent" class to inherit from.

There are some issues. If two parent classes provide the same method but in different versions - which does the class inherit?

Also - diamond problem.

NB: JavaScript is simpler than this. It does not provide a mechanism for "multiple inheritance". Many see this as a good thing.

#### Mixins

JavaScripts object mechanism does not _automatically_ perform copy behaviour when you "inherit"/"instanstiate". Remember - there are no "classes" to instantiate! Only objects.

Objects don't get copied, they get _linked together_.

##### Explicit Mixins

We can actually use a utility `extend(..)` or `mixin(..)` that creates a manual copy of behaviours.

Properties that already exists in one object do not get copied by the "parent".

###### "Polymophism" Revisted

Try not to use this JS as the cost outweighs the benefits.

###### Mixing Copies

What we end up with, when using mixins, is not actually an emulation from the real duplication between class and instance (that you get from class-oriented languages). You end up with a **duplicated reference**.

Truth is, explicit mixins arent that powerful - you could just type out the code and define the properties twice (once in each object).

###### Parasitic Inheritance

A variation of explicit mixin pattern.

```js

// "Traditional JS Class" `Vehicle`
function Vehicle() {
    this.engines = 1;
}
Vehicle.prototype.ignition = function() {
    console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
    this.ignition();
    console.log( "Steering and moving forward!" );
};

// "Parasitic Class" `Car`
function Car() {
    // first, `car` is a `Vehicle`
    var car = new Vehicle();

    // now, let's modify our `car` to specialize it
    car.wheels = 4;

    // save a privileged reference to `Vehicle::drive()`
    var vehDrive = car.drive;

    // override `Vehicle::drive()`
    car.drive = function() {
        vehDrive.call( this );
        console.log( "Rolling on all " + this.wheels + " wheels!" );
    };

    return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!

```

We initally make a copy of the definition from the `Vehicle` parent class (object), then mixin out child class (object) definition. We then pass off this composed object `car` as our child instance.

##### Implicit Mixins

Closely related to _explicit pseudo-polymorphism_.

```js

var Something = {
    cool: function() {
        this.greeting = "Hello World";
        this.count = this.count ? this.count + 1 : 1;
    }
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
    cool: function() {
        // implicit mixin of `Something` to `Another`
        Something.cool.call( this );
    }
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)

```

We have "mixed in" `Something`s behaviour with `Another` using `Something.cool.call(this)`.

It is generally best to avoid such constructs where possible - keeping cleaner and more maintainable code.

##### Review (TL;DR)

Classes are a design pattern. Many languages provide syntax which enables natural class-oriented software design. JS also has a similar syntax, but it behaves **very differently** from what you're used to with classes in those other languages.

**Classes mean copies.**

When traditional classes are instantiated, a copy of behavior from class to instance occurs. When classes are inherited, a copy of behavior from parent to child also occurs.

Polymorphism (having different functions at multiple levels of an inheritance chain with the same name) may seem like it implies a referential relative link from child back to parent, but it's still just a result of copy behavior.

JavaScript **does not automatically** create copies (as classes imply) between objects.

The mixin pattern (both explicit and implicit) is often used to sort of emulate class copy behavior, but this usually leads to ugly and brittle syntax like explicit pseudo-polymorphism (`OtherObj.methodName.call(this, ...)`), which often results in harder to understand and maintain code.

Explicit mixins are also not exactly the same as class copy, since objects (and functions!) only have shared references duplicated, not the objects/functions duplicated themselves. Not paying attention to such nuance is the source of a variety of gotchas.

In general, faking classes in JS often sets more landmines for future coding than solving present real problems.

## Chapter 5: Prototypes

All attempts to emulate class-copy behaviour (mixins) completely circumnavigate the `[[Prototype]]` chain mechanism.

#### `[[Prototype]]`

Internal properties which are a reference to another object. Almost all objects are given a non-`null` value for this value, at time of creation.

Lets take the previous code:

```js

var anotherObject = {
    a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );

myObject.a;     // 2
```

Clearly, myObject.a doesnt _actually_ exist but nevertheless, the property access succeeds as now the two objects are `[[Prototype]]` linked.

However, if `a` weren't found on `anotherObject`, its `[[Prototype]]` chain, if no-empty, is again consulted and followed. It continues until a matching property name is found, or the chain ends (and the `[[Get]]` operation returns `undefined`).

**So, the `[[Prototype]]` chain is consulted, one link at a time, when property look-up performed. This look-up stops once property found or chain ends.**

##### `Object'prototype`

But where dores the chain "end"?

The top-end of every _normal_ `[[Prototype]]` chain is the built in `Object.prototype`. This has built-in utilities from which the chain descends.

Such common ones can include:

1. `.toString()`
2. `.valueOf()`
3. `.hasOwnProperty(..)`
4. `.isPrototypeOf(..)`

##### Setting & Shadowing Properties

Let's revisit a couple of things:

```js

myObject.foo = "bar";

```
One of a few things could happen:

- First, if `myObject` already has norrmal data accessor property `foo` directly present on it, the assignment simply changes existing value.
- If `foo` not already directly present on `myObject`, the `[[Prototype]]` chain is traversed. If `foo` not found, the property is added directly onto the object with the specifed value (`"bar"`).
- If `foo` is already present, but somewhere higher in the chain, something more nuanced happens.
- If `foo` ends up on both `myObject` and higher up the chain, this is called _shadowing_. It shadows the `foo` which appears higher up the chain.

3 examples where `foo` is not directly on the object but _is_ higher up the chain.

1. If a normal data accessor is higher on the `[[Prototype]]` chain, **and _is not_ marked as `writable:false`** then new property `foo` is added directly to `myObject` resulting in a **shadowed property**.
2. If a normal data accessor is higher on the `[[Prototype]]` chain, **and _is_ marked as `writable:false`**, then both properties are **disallowed**. `Strict mode` code will call an error. **No shadowing allowed**.
3. If the `foo` higher up the chain is a setter, then the setter will always be called. No `foo` is added (shadowed on), and niether will the `foo` setter be redefined.

NB: Try to avoid shadowing methods, as it leads to _explicit pseudo-polymorphism_.

Lastly, care must be taken with implicit shadowing:

```js

var anotherObject = {
    a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty( "a" ); // true

```

`myObject.a++` should look up and just increment `anotherObject.a` but it does not do this. In fact, it does this: `myObject.a = myObject.a + 1`.

If we still want to increment it, what should've been done is this: `anotherObject.a++`.

#### "Class"

JS _just_ has objects and no classes.

##### "Class" Functions

People seem to hack something that looks like "classes" in JS. It hinges on a strange characteristic of functions: all functions get a public, non-enumerable property on them called `prototype` which points at an otherwise arbitrary object. It is often called "Foo's prototype".

So, each object created using `new Foo()`:

```js
function Foo() {
    // ...
}

var a = new Foo();

Object.getPrototypeOf( a ) === Foo.prototype;   // true
```

When `a` is created by calling `new Foo()`, `a` gets an internal `[[Prototype]]` link to the object that `Foo.prototype` is pointing at.

**We end up with two objects, linked to each other**. That's _it_.

The term "prototypal inheritance" has done more harm than good as this implies the wrong ideas of what is happening here.

"Inheritance" implies a _copy_ operation and JS doesn't copy object properties by default, it creates a link between two objects instead. "Delegation" is much more accurate as one object can essentially _delegate_ property/function access to another object.

##### "Constructors"

Functions themselves are **not** constructores. However, when you use th keyword `new`, with a normal function call, it turns it into a 'constructor call'. It is called, in a fashion such that it constructs an object, **in addition to whatever else it was going to do**.

This is an important distinction to normal class theory. In JS, functions aren't constructors, but function calls are "contructor calls" iff `new` is used.

##### Mechanics

JS devs have employed other techniques to simulate class-orientation

```js
function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

var a = new Foo( "a" );
var b = new Foo( "b" );

a.myName(); // "a"
b.myName(); // "b"
```

1. `this.name = name`: adds the `.name` property onto each object (similar to how class instance encapsulate data values).
2. `Foo.prototype.myname = ...`: more interesting. Add property (function) to the `Foo.prototype` object. Now `a.myName()` works - but how??

NB: the propertis/functions **_are not_** copied from the `Foo.prototype` object to `a` and `b`. They have ended up with an internal `[[Prototype]]` linkage to `Foo.prototype`. When `myName` is not found on `a` or `b`, it's instead found on `Foo.prototype` (through delegation).

Also, remember how `a.constructor === Foo` seemed like `a` has an actual `.constructor` property and points to `Foo`? Not true. It's also _delegated_ up to `Foo.prototype` which **happens to** have a `.constructor` that point to `Foo` by default.

In essence, arbitrary object-property references like `a1.constructor` cannot be trusted to be the assumed default function reference. It is extremely unreliable and such references should be avoided.

#### "(Prototypal) Inheritance"

Here's the typical "prototype style" code:

```js

function Foo(name) {
    this.name = name;
}

Foo.prototype.myName = function() {
    return this.name;
};

function Bar(name,label) {
    Foo.call( this, name );
    this.label = label;
}

// here, we make a new `Bar.prototype`
// linked to `Foo.prototype`
Bar.prototype = Object.create( Foo.prototype );

// Beware! Now `Bar.prototype.constructor` is gone,
// and might need to be manually "fixed" if you're
// in the habit of relying on such properties!

Bar.prototype.myLabel = function() {
    return this.label;
};

var a = new Bar( "a", "obj a" );

a.myName(); // "a"
a.myLabel(); // "obj a"

```

`Bar.protoype = Object.create( Foo.prototype )` is important:

- `Object.create(..)` _creates_ a "new" object out of thin air
- it links to that new object's internal `[[Prototype]]` to the object you specify.

In other words: "make a _new_ 'Bar dot prototype' object that's linked to 'Foo dot prototype'".

##### Inspecting "Class" Relationship

If you have an object `a` and want to find what objects it delegates to, you can use _introspection_ in trad class-oriented environments.

We can use `instanceof`. It takes a plain object as its left operand and a **function** as it's right one. The question `instanceof` answers: **in the entire `[[Prototype]]` chain of `a`, does the object arbitariliy pointed to by `Foo.prototype` ever appear?

This does mean you can only enquire about the "ancestry" though. If you have two objects and you want to see if they are linked somehow, `instanceof` doesn't actually help.

What's cleaner and simpler is using `isPrototypeOf(..)`:

```js

Foo.prototype.isPrototypeOf( a );   // true

```

The question here is: **In the entire `[[Prototype]]` chain of `a`, does `Foo.prototype` ever appear?

We just need two **objects**.

```js
// Simply: does `b` appear anywhere in
// `c`s [[Prototype]] chain?
b.isPrototypeOf( c );
```

We can also directly retrieve the `[[Prototype]]` of an object:

```js
Object.getPrototypeOf( a );
```

Can also use the strange `.__proto__` which retrieves in the internal `[[Prototype]]` of an object as a reference:

```js
Object.getPrototypeOf( a ) === Foo.prototype;   // true

a.__proto__ === Foo.prototype;  // true

```

We could roughly see it used like this:

```js
Object.defineProperty( Object.prototype, "__proto__", {
    get: function() {
        return Object.getPrototypeOf( this );
    },
    set: function(o) {
        // setPrototypeOf(..) as of ES6
        Object.setPrototypeOf( this, o );
        return o;
    }
} )
```

`.__proto__` is also a settable property, just like using ES6's `Object.setPrototypeOf(..)` shown earlier. However, generally you should not change the `[[Prototype]]` of an existing object.

Note: The JavaScript community unofficially coined a term for the double-underscore, specifically the leading one in properties like `__proto__`: "dunder". So, the "cool kids" in JavaScript would generally pronounce `__proto__` as "dunder proto".

#### Object Links

As we've now seen, the `[[Prototype]]` mechanism is an internal link that exists on one object which references some other object.

##### `Create()`ing Links

Why do so many JS devs go to the trouble of emulating classes in their code to wire up linkages?

```js
Let's introduce `Object.create(..)`:

var foo = {
    something: function() {
        console.log( "Tell me something good..." );
    }
};

var bar = Object.create( foo );

bar.something(); // Tell me something good...
```

`Object.create(..)` creates a new object (`bar`) linked to the object we specified (`foo`), which gives us all the power (delegation) of the `[[Prototype]]` mechanism, but without any of the unnecessary complication of `new` functions acting as classes and constructor calls, confusing `.prototype` and `.constructor` references, or any of that extra stuff.

We don't need classes to create meaningful relationships between two objects. The only thing we should **really care about** is objects linked together for delegation, and `Object.create(..)` gives us that linkage without all the class rubbish.

###### `Object.create()` Polyfilled

Older JS environments may not support this so a simple **partial** polyfill will be needed:

```js

if (!Object.create) {
    Object.create = function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    };
}

```

This polyfill works by using a throw-away `F` function and overriding its `.prototype` property to point to the object we want to link to. Then we use `new F()` construction to make a new object that will be linked as we specified.

Some devs don't agree with partial polyfilling and require a strict view where no function should be polyfilled unless it can be _fully_ polyfilled.

##### Links As Fallbacks?

It may be tempting to think that these links between objects primarily provide a sort of fallback for "missing" properties or methods. While that may be an observed outcome, I don't think it represents the right way of thinking about `[[Prototype]]`.

Consider:

```js

var anotherObject = {
    cool: function() {
        console.log( "cool!" );
    }
};

var myObject = Object.create( anotherObject );

myObject.cool(); // "cool!"

```

This will work by virtue of `[[Prototype]]` but it appears a bit 'magical' to other devs.

```js

You can however design your API with less "magic" to it, but still take advantage of the power of [[Prototype]] linkage.

var anotherObject = {
    cool: function() {
        console.log( "cool!" );
    }
};

var myObject = Object.create( anotherObject );

myObject.doCool = function() {
    this.cool(); // internal delegation!
};

myObject.doCool(); // "cool!"

```

Here, we call `myObject.doCool()`, which is a method that _actually exists_ on `myObject`, making our API design more explicit (less "magical"). _Internally_, our implementation follows the **delegation design pattern** (see Chapter 6), taking advantage of `[[Prototype]]` delegation to `anotherObject.cool()`.

In other words, delegation will tend to be less surprising/confusing if it's an internal implementation detail rather than plainly exposed in your API interface design. Will expound on **delegation** in great detail in the next chapter.

#### Review (TL;DR)

When attempting a property access on an object that doesn't have that property, the object's internal `[[Prototype]]` linkage defines where the `[[Get]]` operation (see Chapter 3) should look next. This cascading linkage from object to object essentially defines a "prototype chain" (somewhat similar to a nested scope chain) of objects to traverse for property resolution.

All normal objects have the built-in `Object.prototype` as the top of the prototype chain (like the global scope in scope look-up), where property resolution will stop if not found anywhere prior in the chain. `toString()`, `valueOf()`, and several other common utilities exist on this `Object.prototype` object, explaining how all objects in the language are able to access them.

The most common way to get two objects linked to each other is using the `new` keyword with a function call, which among its four steps (see Chapter 2), it creates a new object linked to another object.

The "another object" that the new object is linked to happens to be the object referenced by the arbitrarily named `.prototype` property of the function called with `new`. Functions called with `new` are often called "constructors", despite the fact that they are not actually instantiating a class as _constructors_ do in traditional class-oriented languages.

While these JavaScript mechanisms can seem to resemble "class instantiation" and "class inheritance" from traditional class-oriented languages, the key distinction is that in JavaScript, no copies are made. Rather, objects end up linked to each other via an internal `[[Prototype]]` chain.

For a variety of reasons, not the least of which is terminology precedent, "inheritance" (and "prototypal inheritance") and all the other OO terms just do not make sense when considering how JavaScript _actually_ works (not just applied to our forced mental models).

Instead, "delegation" is a more appropriate term, because these relationships are not copies but delegation **links**.