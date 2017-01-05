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
