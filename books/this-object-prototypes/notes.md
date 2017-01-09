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




