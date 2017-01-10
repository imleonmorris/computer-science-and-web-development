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


Class Theory

Class Mechanics

Class Inheritance

Mixins


## Chapter 5: Prototypes


[[Prototype]]

"Class"

"(Prototypal) Inheritance"

Object Links


## Chapter 6: Behavior Delegation


Towards Delegation-Oriented Design

Classes vs. Objects

Simpler Design

Nicer Syntax

Introspection


