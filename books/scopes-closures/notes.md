# Notes related to what I learned while completing YSKJS: Scopes and Closures

## Chapter 1: What is Scope?

### Compiler Theory

JavaScript falls under the category of 'dynamic' or 'interpreted' language but code IS in fact compiled RIGHT BEFORE it is executed. The compiler will take the program `var a = 2;` and compile it *first, and then be ready to execute it, usually right away.

To do this, source code must typically be *tokenized* (broken up into meaningful chunks), *parsed* (turned into an Abstract Syntax Tree) and turned into *executable code* BEFORE it is compiled.

### Understanding Scope

It is useful to see scope as a conversation between three people: *Engine* (s-t-f compilation/execution), *Compiler* (parses/generates code) and *Scope* (collects/maintains list of vars, enforces rules).

For you to *fully understand* how JavaScript works, you need to begin to *think* like *Engine* (and friends) think, ask the questions they ask, and answer those questions the same.

#### Back & Forth

Let's take program `var a = 2;`.

*Engine* sees two distinct statements, one which *Compiler* will handle during compilation, and one which *Engine* will handle during execution.

1. *Compiler* performs lexing to break it down into tokens, which it will then parse into a tree.
2. When encountering `var a`, *Compiler* asks *Scope* to see if a variable `a` already exists for that particular scope collection. If so, *Compiler* ignores this declaration and moves on. Otherwise, *Compiler* asks *Scope* to declare a new variable called `a` for that scope collection.
3. *Compiler* then produces code for *Engine* to later execute, to handle the `a = 2` assignment. The code *Engine* runs will first ask *Scope* if there is a variable called `a` accessible in the current scope collection. If so, *Engine* uses that variable. If not, *Engine* looks *elsewhere* (see nested *Scope* section below).
4. If *Engine* finds a variable, it assigns the value `2` to it. If not, *Engine* will raise an error!

#### LHS and RHS

LHS is the target (e.g. var) of an assignment: a = 2;

RHS the source of an assignment: console.log( a );

### Nested Scope

*Scope* is a set of rules for looking up variables by their identifier name. There's usually more than one *Scope* to consider.

Just as a block or function is nested inside another block or function, scopes are nested inside other scopes. So, if a variable cannot be found in the immediate scope, *Engine* consults the next outer containing scope, continuing until found or until the outermost (aka, global) scope has been reached.

Engine starts at currently executing Scope, looks for declared variables there, then moves up a level all the way to global scope.

### Errors

Why does it matter whether we call it LHS or RHS?

Because these two types of look-ups behave differently in the circumstance where the variable has not yet been declared (is not found in any consulted *Scope*).

* If RHS isn't found: ReferenceError
* If LHS isn't found: create new var (if not in strict mode)
* TypeError occurs when Scope successful but action attempted is illegal or impossible.

### Summary

* Scope is the set of rules that determines where and how a variable (identifier) can be looked-up.
* LHS references result from assignment operations. *Scope*-related assignments can occur either with the `=` operator or by passing arguments to (assign to) function parameters.
* The JavaScript *Engine* first compiles code before it executes, and in so doing, it splits up statements like `var a = 2;` into two separate steps:

    1. First, `var a` to declare it in that *Scope*. This is performed at the beginning, before code execution.
    2. Later, `a = 2` to look up the variable (LHS reference) and assign to it if found.

* Both LHS and RHS reference look-ups start at the currently executing *Scope*, and work their way up the nested *Scope*, one scope (floor) at a time, looking for the identifier, until they get to the global (top floor) and stop. They either find it, or don't.
* Unfulfilled RHS references result in `ReferenceError`s being thrown. Unfulfilled LHS references result in an automatic, implicitly-created global of that name (if not in "Strict Mode" [^note-strictmode]), or a `ReferenceError` (if in "Strict Mode" [^note-strictmode]).

## Chapter 2: Lexical Scope

**JavaScript uses the *lexical* scope model.**

### Lex-time

The first traditional phase of a standard language compiler is called lexing (aka, tokenizing).

The lexing process examines a string of source code characters and assigns semantic meaning to the tokens as a result of some stateful parsing. Scope look-up stops once it find the first match and works inner --> outer.

Lexical scope is scope that is defined at lexing time. In other words, lexical scope is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code.

Possible to access global var using window e.g. window.a

#### Look-ups

The structure and relative placement of scope bubbles fully explains to the *Engine* all the places it needs to look to find an identifier.

**Scope look-up stops once it finds the first match**.

**Note:** Global variables are also automatically properties of the global object (`window` in browsers, etc.), so it *is* possible to reference a global variable not directly by its lexical name, but instead indirectly as a property reference of the global object.

### Cheating Lexical

There are two main ways to cheat lexical scope discussed in this chapter.

#### `eval`

The `eval(..)` function in JavaScript takes a string as an argument, and treats the contents of the string as if it had actually been authored code at that point in the program. In other words, you can programmatically generate code inside of your authored code, and run the generated code as if it had been there at author time.

#### `with`

The other frowned-upon (and now deprecated!) feature in JavaScript which cheats lexical scope is the `with` keyword. There are multiple valid ways that `with` can be explained, but I will choose here to explain it from the perspective of how it interacts with and affects lexical scope.

`with` is typically explained as a short-hand for making multiple property references against an object *without* repeating the object reference itself each time.

#### Performance

Your code will almost certainly tend to run slower because the compiler will not optimize it if you include an `eval(..)` or `with` anywhere in the code. No matter how smart the *Engine* may be about trying to limit the side-effects of these pessimistic assumptions, **there's no getting around the fact that without the optimizations, code runs slower.**

### Review (TL;DR)

Lexical scope means that scope is defined by author-time decisions of where functions are declared. The lexing phase of compilation is essentially able to know where and how all identifiers are declared, and thus predict how they will be looked-up during execution.

Two mechanisms in JavaScript can "cheat" lexical scope: `eval(..)` and `with`. The former can modify existing lexical scope (at runtime) by evaluating a string of "code" which has one or more declarations in it. The latter essentially creates a whole new lexical scope (again, at runtime) by treating an object reference *as* a "scope" and that object's properties as scoped identifiers.

The downside to these mechanisms is that it defeats the *Engine*'s ability to perform compile-time optimizations regarding scope look-up, because the *Engine* has to assume pessimistically that such optimizations will be invalid. Code *will* run slower as a result of using either feature. **Don't use them.**



