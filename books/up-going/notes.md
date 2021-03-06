# Notes related to what I learned while completing YDKJS: Up and Going

## Chapter 1: Into Programming

### Code

#### Statements

In a computer language, a group of words, numbers, and operators that performs a specific task is a *statement*. 

JavaScript statements end with a `;`.

#### Expressions

* `2` is a *literal value expression*
* `b` is a *variable expression*, which means to retrieve its current value
* `b * 2` is an *arithmetic expression*, which means to do the multiplication
* `a = b * 2` is an *assignment expression*, which means to assign the result of the `b * 2` expression to the variable `a` (more on assignments later)


#### Executing a Program

A program can be run:
- top to bottom (interpreting).
- a program could be translated ahead of time (compiling) in order to run later.

It's typically asserted that JavaScript is *interpreted*, because your JavaScript source code is processed each time it's run. But that's not entirely accurate. The JavaScript engine actually *compiles* the program.

Therefore, the program is compiled first and then immediately run.

#### Input/Output

For command line applications, use `console.log()` to output to the console.

If you're running in a browser, you can use `prompt()` to get input, and `alert()` to provide output.


### Operators

* Assignment: `=` as in `a = 2`.
* Math: `+` (addition), `-` (subtraction), `*` (multiplication), and `/` (division), as in `a * 3`.
* Compound Assignment: `+=`, `-=`, `*=`, and `/=` are compound operators that combine a math operation with assignment, as in `a += 2` (same as `a = a + 2`).
* Increment/Decrement: `++` (increment), `--` (decrement), as in `a++` (similar to `a = a + 1`).
* Object Property Access: `.` as in `console.log()`.
* Equality: `==` (loose-equals), `===` (strict-equals), `!=` (loose not-equals), `!==` (strict not-equals), as in `a == b`.
* Comparison: `<` (less than), `>` (greater than), `<=` (less than or loose-equals), `>=` (greater than or loose-equals), as in `a <= b`.
* Logical: `&&` (and), `||` (or), as in `a || b` that selects either `a` *or* `b`.

### Values & Types

###### Types
- `number`: 42;
- `string`: "I am a string";
- `boolean`: true;

###### When to use
* When you need to do maths, you would use a `number`. 
* When you need to print a value on the screen, you need a `string` (one or more characters, words, sentences).
* When you need to make a decision in your program, you need a `boolean` (`true` or `false`).

###### Other info
- Values that are included directly in the source code are called *literals*. `string` literals are surrounded by double quotes `"..."` or single quotes (`'...'`)
- Beyond the basic `string`/`number`/`boolean` value types, JavaScript also provides more advanced types such as *arrays*, *objects*, *functions*, and more. 
- Declare a variable using the `var` statement -- notice there's no other *type* information in the declaration. Use `const` instead of var if the value is not expected to change.
- JavaScript uses *dynamic typing*, meaning variables can hold values of any *type* without any *type* enforcement.

#### Converting Between Types

Use  `Number(..)` to  *explicitly* coerce from any other type to the `number` type. 

Using triple equals `===` avoids *implicit* coercion. Double equals `==` will allow *implicit* coercion.

### Code Comments

* Code without comments is suboptimal and not acceptable.
* Too many comments (one per line, for example) is probably a sign of poorly written code.
* Comments should explain *why*, not *what*. They can optionally explain *how* if that's particularly confusing.
* `// comment ` for single line comment `/* comment */` for multiline comment

### Blocks, Conditionals and Loops

* blocks - Anything between braces `{ .. }` - a block statement does not need a semicolon (`;`) to conclude it
* The `if` statement requires an expression in between the parentheses `( )` that can be treated as either `true` or `false`. 
You can even provide an alternative if the condition isn't true, called an `else` clause. 
* `while`
* `do..while` (always performs one iteration)
* `for` (offer significant control and simplicity)
```JavaScript
for (var i = 0; i <= 9, i += 1) {
    console.log( i );
}
// 0 1 2 3 4 5 6 7 8 9
```
### Functions

In JavaScript, each function (named section of code that can be "called" by name) gets its own *lexical scope*. 

Scope is a collection of variables and rules for how those variables are accessed by name. Only code inside that function can access that function's *scoped* variables. A variable name has to be unique within the same scope -- there can't be two different `a` variables sitting right next to each other. But the same variable name `a` could appear in different scopes.

Lexical scope rules say that code in one scope can access variables of either that scope or any scope outside of it.

### Practice

* Write a program to calculate the total price of your phone purchase. You will keep purchasing phones (hint: loop!) until you run out of money in your bank account. You'll also buy accessories for each phone as long as your purchase amount is below your mental spending threshold.
* After you've calculated your purchase amount, add in the tax, then print out the calculated purchase amount, properly formatted.
* Finally, check the amount against your bank account balance to see if you can afford it or not.
* You should set up some constants for the "tax rate," "phone price," "accessory price," and "spending threshold," as well as a variable for your "bank account balance.""
* You should define functions for calculating the tax and for formatting the price with a "$" and rounding to two decimal places.
* **Bonus Challenge:** Try to incorporate input into this program, perhaps with the `prompt(..)` covered in "Input" earlier. You may prompt the user for their bank account balance, for example. Have fun and be creative!


## Chapter 2: Into JavaScript

### Types:

* `string`
* `number`
* `boolean`
* `null` and `undefined`
* `object`
* `symbol` (new to ES6)

can use `typeof` to find the type of a value

### Objects

Compound values whose members may be accessed via dot or bracket notation:

```JavaScript
var obj = {
    a: "hello world",
    b: 42,
    c: true
};

obj.a;      // "hello world"
obj.b;      // 42
obj.c;      // true

obj["a"];   // "hello world"
obj["b"];   // 42
obj["c"];   // true
```

* *Arrays* are a type of object which holds many disparate values at indexed positions. Zero indexed.
* *Functions* are a type of object which manipulate data in some way. Can have member variables.
* *Objects* may have built-in type methods.

### Type coercion

* Can be explicit, where you intentionally convert a number to a string, for instance
* Can also be implicit, where JavaScript converts one type to another behind the scene to allow for a comparison between two disparate types

Falsy values (everything except these is truthy):

* "" (empty string)
* 0, -0, NaN (invalid number)
* null, undefined
* false

`==` and `!=` allow coercion, `===` and `!==` do not, so use the latter to prevent coercion.

### Variables

Valid variable names - must start with a-z, A-Z, $, or _. It can then contain any of those characters plus the numerals 0-9.

**Hoisting**

JavaScript moves all `var` and function declarations to the top of the file as part of the compilation process.

**Nested Scopes**

When you declare a variable, it is available anywhere in that scope, as well as any lower/inner scopes.

**Conditionals**

* if
* if, else
* if, else if, else
* switch - case, break

**Strict Mode**

"use strict" - causes the compiler to throw errors when you're doing crazy crap that might not work how you want it to.

**Immediately Invoked Function Expressions (IIFEs)**

```JavaScript
(function IIFE(){
    console.log( "Hello!" );
})();
// "Hello!"
```
Because an IIFE is just a function, and functions create variable scope, using an IIFE in this fashion is often used to declare variables that won't affect the surrounding code outside the IIFE:

**Closure**

You can think of closure as a way to "remember" and continue to access a function's scope (its variables) even once the function has finished running.


**Modules**

The most common usage of closure in JavaScript is the module pattern. Modules let you define private implementation details (variables, functions) that are hidden from the outside world, as well as a public API that is accessible from the outside.


**Prototypes**

When you reference a property on an object, if that property doesn't exist, JavaScript will automatically use that object's internal prototype reference to find another object to look for the property on. You could think of this almost as a fallback if the property is missing.

**Polyfilling/Transpiling**

Either using functions written in an older version of JavaScript to mimic new functionality present in newer versions (Polyfilling) or running newer version code through a process which will convert it to the equivalent in older version code (Transpiling).
