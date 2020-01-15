---
title: JavaScript Fundamentals 
toc: 1
---

# About JavaScript

> JavaScript&copy; (often shortened to JS) is a lightweight, interpreted, object-oriented language with first-class functions, and is best known as the scripting language for Web pages, but it's used in many non-browser environments as well. It is a prototype-based, multi-paradigm scripting language that is dynamic, and supports object-oriented, imperative, and functional programming styles.
>
> -- *Mozilla Developer Network* (https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript)

- **Interpreted:** There are JavaScript engines (SpiderMonkey, V8, Spartan) that read the code and convert it into machine language as the code is running.

- **Multiple Environments:** - The web is where it started but servers and desktop applications are also using it now.

- **Dynamic:** - Data, structures, and even the code can be rewritten on the fly. (Side note: imagine writing code that rewrites it's own code.)

- **Multi Paradigm:** - Can be written as object-oriented, imperative, and functional (all mixed together if you want).

- **Prototype Based:** Object structures can use classical inheritance, object composition, and prototypical inheritance. You have full control on exactly what is inherited.

# JavaScript in the Browser vs. the Server

- Both run the same. Code and logic in one will execute identically to code and logic in the other.

- The Browser provides some libraries that the server does not and vice versa.

    - Browser has: Window, Document Object Model (DOM).
    - Server has: Operating System, File System, Network Systems, etc.

# Developer Tools

There exist developer tools that allow you to easily see what is going on with your code. Tool include but are not limited to:

1. A console where you can run JavaScript commands and see log output.
2. A debugger where you can pause the execution of your code, look at values in memory, and step through your code.
3. An inspector where you can look at the HTML and the DOM.
4. Network traffic tools

## First Bit of Code

1. Open a web browser and open the developer tools to the console.

    Open your developer tools:

    - **Chrome**
        1. Click the Menu button
        2. Click *More tools*
        3. Click *Developer tools*
        4. Make sure you're on the *Console* tab.

    - **Firefox**
        1. Click the Menu button
        2. Click *Web Developer*
        3. Click *Web Console*

2. Enter this code:

    ```js
    alert('Hello, World!');
    ```

3. Run the code. (Try pressing Enter key or find a play button.)

### About That Code

- `alert` is a function that only exists within browsers.

- Double quotes or single quotes are fine and have identical results. (I prefer single so that I don't have to hold the shift button.)

- Semi-colons are placed at the end of the *Expression Statement* and are mostly optional.

## Console Logging

- For logging, it is better to use the console than the alert.

- You can execute JavaScript from the console.

### Exercise

With the developer console open, enter the following JavaScript into the console and hit the *Enter* key.

**Tip:** To enter multiple lines, use `Shift-Enter` to go to the next line.

```js
alert('Hello');
console.log('Good bye');
```

# Comments

Comments can be for a single line:

```js
// anything following two slashes is a comment
alert('Hello'); // say hello
```

Comments can also be for a block:

```js
/*
This is a comment.
*/
```

# Data Types

## Primitives vs Objects

- Primitives cannot have properties.
- Objects can have properties.

## Variable Assignment

- Assignment to primitives are by value.

    ```js
    var x = '123';  // x has '123' and takes one slot in memory
    var y = x;      // y has the same value as x, but it's a copy of the value and takes a second slot in memory
    ```

- Assignments to objects are by reference.

    ```js
    var x = {};     // x has {} and takes one slot in memory
    var y = x;      // y is the same as x and uses the same slot in memory
    ```

## Immutable vs Mutable

*We're not talking about audio volume levels here.*

<--

What is the difference between immutable and mutable data?

--

"Mutable" has the same base word as the word "mutation", so:
 
 - **Immutable** means that the data cannot be changed.
 
     ```js
     var x = '123';  // x is assigned the value '123'
     x = 'abc';      // x is assigned the value 'abc'
     ```
 
     The variable `x` is assigned a new value, we did not modify `'123'`.
 
 - **Mutable** means that the data can be changed.
 
     ```js
     var x = {};     // x is assigned an empty object
     x.foo = 'bar';  // we modify the object to add the property `foo` with value `'bar'`
     ```
   
-->

## JavaScript's Data Types

| Data Type     | Primitive     | Assign by Value   | Assign by Reference   | Immutable |
| ------------- | ------------- | ----------------- | --------------------- | --------- |
| undefined     | x             | x                 |                       | x         |
| null          | x             | x                 |                       | x         |
| boolean       | x             | x                 |                       | x         |
| number        | x             | x                 |                       | x         |
| string        | x             | x                 |                       | x         |
| symbol        | x             |                   | x                     | x         |
| object        |               |                   | x                     |           |

To determine the type of a variable:

```js
var a = 5;
console.log(typeof a);        // will log 'number'
```

# Variable Declarations

There are three types of variable declarations:

## var

- Create a variable that can be assigned to a value any number of times.
- Scoped to the nearest closure. (More on this in a minute.)
- Universal browser support.
- Supported by all versions of NodeJS.
- I would avoid using `var`. There are better options.

```js
var a;
var b = 5;
```

## const

- Create a variable that must have it's value assigned immediately.
- The value cannot be reassigned.
- Scoped to the nearest block.
- Good browser support
- Support by NodeJS 4.0+

```js
if (true) {
    const a = 123;
    console.log(a);     // 123
    // a = 5            <-- would throw an error because it cannot be set again
}
console.log(a);         // undefined
```

## let

- Create a variable that can be assigned any number of times.
- Scoped to the nearest block.
- Evergreen browser support
- Support by NodeJS 4.3.2+

```js
if (true) {
    let a = 123;
    console.log(a);     // 123
    a = 5;
}
console.log(a);         // undefined
```

# Loops

There are many types of loops in JavaScript, but here we're going to look at just the imperative loop styles.

<--

What does imperative mean?

--

You give the computer very specific instructions on how to do something. In this case we'll be explicitly telling the computer how to loop.

-->

## For Loop

```js
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

## While Loop

```js
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}
```

## Do Loop

Will execute at least once.

```js
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 10);
```

## Break and Continue

You can exit a loop early by calling `break`.

```js
for (let i = 0; i < 10; i++) {
    console.log(i);
    break;              // break the loop on the first iteration
}
```

You can start the next iteration early by calling `continue`.

```js
for (let i = 0; i < 10; i++) {
    console.log(i);
    continue;                   // start the loop with next index
    console.log(i * 2);         // never reaches this line
}
```

<--

What is the difference in console output between the following two code examples and why?

Note that the function `setTimeout` will execute it's code after the number of milliseconds specified.

**Option 1**

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

**Option 2**

```js
for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

--

**Option 1 Result**

Option 1 uses `var` that has a closure scoped to the encapsulating function.

```sh
5
5
5
5
5
```

**Option 2 Output**

Option 2 uses `let` that has a closure scoped to the nearest block, in this case the `for` loop.

```sh
1
2
3
4
5
```


-->

# Operators

## Assignment Operator

You've already seen this one, a single `=`.

```js
let x = 5;
x = 6;
```

## Math Operators

- **Addition:** `1 + 2`

- **Subtraction:** `5 - 2`

- **Multiplication:** `2 * 3`

- **Division:** `5 / 2`

- **Modulus:** `5 % 3`  (remainder of dividing 5 / 3 )

- **Increment:**

    ```js
    let a = 1;
    a++;        // increment after expression evaluation
    ++a;        // increment before expression evaluation
    a += 5;     // add 5 to a
    ```

- **Decrement:**

    ```js
    let a = 5;
    a--;        // decrement after expression evaluation
    --a;        // decrement before expression evaluation
    a -= 5;     // remove 5 from a
    ```

## Comparison Operators

- **Less Than:** `<`

- **Less Than or Equal:** `<=`

- **Greater Than:** `>`

- **Greater Than or Equal:** `>=`

- **Value is Equal:** `==`

- **Value and Type is Equal:** `===`

- **Value is not Equal:** `!=`

- **Value and Type is not Equal:** `!==`

**Pro Tip**

To reduce the number of logic errors in your code:

- Use `===` more than `==`
- Use `!==` more than `!=`

```js
0 == ""         // true
0 === ""        // false

0 == false      // true
0 === false     // false
```

## Truthy or Falsy

Falsy Values:

- `0`
- `null`
- `''` (empty string)
- `false`

Truthy Values:

- Everything that isn't falsy.

<--

How many times will the following code loop and why?

```js
let i = 5
while (i--) {
    console.log(i)
}
```

--

It will loop 5 times. Each time through the loop it checks the value of `i`, then decrements it. Once `i` is zero it's falsy and the loop stops.

-->

<--

How many times will the following code loop and why?

```js
let i = 5
while (--i) {
    console.log(i)
}
```

--

It will loop 4 times. Each time through the loop it decrements the value of `i`, then checks the value. Once `i` is zero it's falsy and the loop stops.

-->

# Conditional Statements

With conditional statements you can execute logic based on current state information.

## Single Line If Statement

```js
if (a === b) console.log('They are equal');
```

## Multi Line If Statement

The code block is enclosed by squiggly brackets.

```js
if (a === b) {
    console.log('They are equal');
}
```

## Compound If Statement

```js
if (a === b) {
    console.log('They are equal');
} else if (a < b) {
    console.log('"A" is smaller');
} else {
    console.log('"B" is smaller');
}
```

## Conditional Ternary Operator

A shorthand version of if-else statements.

```js
// conditional operator
let y = a === b ? 1 : 2;

// equivalent to
let y;
if (a === b) {
    y = 1;
} else {
    y = 2;
}
```

## Switch Statement

- When a case is met it will execute all code blocks until a break is reached.
- Don't forget to break at the end of a block.

```js
switch (a) {
    case 1:
    case 2:
        console.log('It is a number 1 or 2');
        break;
    case 'One':
        console.log('It is the string One');
        break;
    default:
        console.log('It is something else');
}
```

# Functions

- Functions create a closure scope.

- A variable declared outside of a function is accessible within the function.

- A variable declared within a function is not accessible outside the function.

```js
let a = 1;
let b = 2;

function foo() {	    //define the function
  let a = 10;
  let x = 'Hello';
  console.log(a, b, x); // 10, 2, 'Hello'
}

foo();	                //call the function
console.log(a, b, x);   // 1, 2, undefined
```

**Pro Tip**

- Be very careful setting the values of variables outside of the closure you are working on.

- If you forget to declare a variable you may unintentionally set the value for a variable of a higher closure (perhaps a global variable).

## Referencing

- You can create *named* functions.

    ```js
    function foo() {}       // the name is foo

    foo();                  // call the function
    ```

- You can assign functions to variables. This is what makes JavaScript a first-class functional language.

    ```js
    const x = function foo() {};    // define foo and assign to x
    x();                            // call foo
    foo();                          // call foo

    function bar() {}               // define function and make assignment
    const y = bar;
    ```

- You can create *anonymous* functions that you assign to variables.

    ```js
    const x = function() {}   // the name is undefined
    x();                    // call the anonymous function
    ```

## Parameters

- A function can take any number of parameters.

- The defined function gets to choose the name of those parameters within the function.

```js
function add(a, b) {
    console.log(a + b);             // output the result of a + b to the console
}

const multiply = function(a, b) {
    console.log(a * b);             // output the result of a * b to the console
}
```

<--

Can you pass a function in as a parameter to another function?

--

Yes. The fact that JavaScript can do this is what makes it a first class functional language.

-->

## Parameter Defaults

```js
function greet (name = 'stranger') {
    console.log('Hello, ' + name)
}

greet('Bob')    // "Hello, Bob"
greet()         // "Hello, stranger"
```

## Returns

- A function can only return one value.

- You can have any number of return statements within a function, but it can only return once.

```js
function greet(name) {
    if (name) {
        return 'Hello, ' + name;
    } else {
        return 'Hello, stranger';
    }
    return "You'll never return here because it already returned";
}
```

## Function Calls

- Use the name of the function (or a variable with it's reference) to call the function.

- You must have parenthesis after the function name or reference to call it.

- Parameters values can be passed in within the parenthesis.

- The calling signature does not need to match the function signature.

```js
const G = function greet(name) {
    return 'Hello, ' + name;
}

const x = greet('Bob');           // x gets the value 'Hello, Bob'
const y = greet();                // y gets the value 'Hello, undefined'
const z = greet('Sue', 'Amy');    // z gets the value 'Hello, Sue'
const a = G('you');               // a gets the value 'Hello, you'
```

<--

How does the last line in the example work without using the function name of `greet`?

--

We stored a reference to the function in variable `G`.

-->

## When is a Function Available

When a named function is defined it is immediately available to the entire closure scope.

```js
add(2, 3);

function add(a, b) {
    return a + b;
}
```

When a function is assigned to the variable, it is only available to call via the variable after the assignment.

```js
const add = function(a, b) {
    return a + b;
}

add(2, 3);
```

## IIFE - Immediately Invoked Functional Expression

- A function that is executed right as it is defined.

- Great for limiting variable scope.

    - Complex functions use a lot of variables and you don't want those to conflict with other variables that might be named the same.

    - The closure protects your function from the outside.

    - The closure protects the outside from your function.

- It can return a value but does not need to.

```js
const str = (function(name, age) {
    return name + ' is ' + age + ' years old.';
})('Bob', 5);

console.log(str);       // logs 'Bob is 5 years old.'
```

<--

Why would you use an IIFE?

--

Functions create closure (scope). Variables defined within the closer are limited to the closure. You can run a bunch of code without having to muck up the higher level scope.

-->

**Pro Tip**

For every JavaScript file you write, you should wrap all of the code for that file in an IIFE. Note that when writing JavaScript files using a module system (NodeJS, Require, ES6 modules, etc.) that the file in your code will automatically be wrapped with an IIFE.

## Arrow Functions

- They are shorthand anonymous functions.

- They cannot be named.

- They keep the context of their surroundings. We'll learn about context below.

- You can assign them to a variable or pass them to another function as that function's parameter.

- If the body has a single expression then the result of it's body's expression is automatically returned.

**With One Parameter**

```js
// arrow function
x => x + 5;

// equivalent to
function (x) {
    return x + 5;
}
```

**With No Parameters**

```js
// arrow function
() => 5;

// equivalent to
function () {
    return 5;
}
```

**With More Than One Parameter**

```js
// arrow function
(a, b) => a + b;

// equivalent to
function (a, b) {
    return a + b;
}
```

**With a More Complex Body**

```js
// arrow function
(a, b) => {
    console.log(a, b);
    return a + b;
}

// equivalent to
function (a, b) {
    console.log(a, b);
    return a + b;
}
```

## Variable Number of Arguments

- Because the function signature doesn't have to match the calling signature we can receive any number of parameters.

- It is possible to see how many arguments a function received.

- We use the `arguments` keyword within a function.

- `arguments` is an array-like object (not an array).

```js
function greet() {
  const length = arguments.length;
  for (let i = 0; i < length; i++) {
    const name = arguments[i];
    console.log('Hello, ' + name);
  }
}

greet('Amy', 'Andrew', 'Kim', 'Lance', 'Tyler', 'Zoe');
```

It is also possible to address the rest of the parameters using the spread operator.

```js
function greet(...names) {
  const length = names.length;
  for (let i = 0; i < length; i++) {
    console.log('Hello, ' + names[i]);
  }
}
```

## Optional Arguments

- Using the variable arguments also makes it possible to use optional arguments.

```js
function greet(name = 'stranger') {
    return 'Hello, ' + name;
}

greet('Bob');   // returns: Hello, Bob
greet();        // returns: Hello, stranger
```

<--

How could you create a function that takes two parameters and the first parameter is an optional string and the second is a required number?

--

You could detect how many arguments were used to call the function `arguments.length`, but it would be better to detect the first argument's type:

```js
function foo(str, num) {
    if (arguments.length === 1) {
        if (typeof str === 'number') {
            num = str;
            str = '';           // give str a default value
        } else {
            throw new Error('Invalid input parameters');
        }
    }
    // ... additional logic
}
```

Note: We'll talk about Errors later.

-->

# Callback Functions

Pass a function (A) to another function (B) as a parameter. Function B calls Function A.

<--

Why would you pass a function into another function as a parameter?

--

Most commonly it is to have the function that receives the input parameter (function) call that function (input parameter).

-->


In the following example `greet` is passed to `repeat` as a parameter and `repeat` calls `greet`.

```js
function greet() {
    console.log('Hello')
}

function repeat (count, callback) {
    for (let i = 0; i < count; i++) {
        callback()
    }
}

repeat(3, greet)
```

<--

Which function gets to decide the parameters that `greet` will be called with?

--

The function `repeat` calls `greet`, so it gets to decide what parameters it passes when it calls `greet`.

-->

# Currying

- Currying allow for defining a function that uses partial application.

- Improve processing performance.

- Smaller JavaScript file sizes.

- Write less code.

- More consistent operation.

**Non-Currying Example**

```js
function greet(greeting, name) {
    return greeting + ', ' + name;
}

greet('Hello', 'Bob');
greet('Hello', 'Jan');
greet('Hola', 'Juan');
```

**Currying Example**

```js
function makeGreetFunction(greeting) {
    return function(name) {
        return greeting + ', ' + name;
    };
}

const englishGreeting = makeGreetFunction('Hello');
const spanishGreeting = makeGreetFunction('Hola');

englishGreeting('Bob');     // 'Hello, Bob'
englishGreeting('Jan');     // 'Hello, Jan'
spanishGreeting('Juan');    // 'Hola, Juan'
```

<--

How can currying improve processing performance?

--

Part of the data has already been calculated to run the rest of the function.

In the following example the time consuming math of determining a factorial base is determined once and reused.

```js
function factorialPlus(n) {
  const base = factorial(n);
  return function (num) {
    return base + num;
  }
}

function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

const f5 = factorialPlus(5);
console.log(f5(0));     // 120
console.log(f5(1));     // 121
console.log(f5(2));     // 122
```

-->

# Objects

<--

What is the difference between an object and a primitive?

--

Objects can have properties, primitives cannot.

-->

## Object Composition

- The act of building objects piece by piece.

- Creating objects directly.

### Create a Plain Object

These two lines do the same thing, but one is less to write.

```js
const obj1 = {};
const obj2 = new Object();
```

### Object Properties

- An object can have any number of properties.

- Each property can be assigned any value (just like variables).

**Initialize an Object with Properties**

```js
const obj = {
    name: 'Bob',
    age: 20,
    gender: 'male'
}
```

**Add Properties to an Existing Object**

```js
const obj = {};
obj.name = 'Bob';
obj['age'] = 20;

const x = 'gender';
obj[x] = 'male';
```

**Get Properties from an Object**

```js
const obj = {};
obj.name = 'Bob';
obj['age'] = 20;

const name = obj.name;
const age = obj.age;
```

**Remove Properties from an Object**

```js
const obj = { name: 'Bob', age: 20 };
delete obj.name;
delete obj['age'];
```

**Functions as Property Values**

```js
const obj = {
    hello: function (name) {
        console.log('Hello, ' + name)
    },
    bye (name) {
        console.log('Bye, ' + name)
    }
}
```

**Getter and Setters**

<--

What are getters and setters?

--

Getters and setters look like ordinary properties, but they run some sort of computation to get the value and run some sort of computation when setting the value.

-->

```js
let x = 0
const obj = {
    get value() {
        return x
    },
    set value(val) {
        x = val
    }
}

obj.x = 5
console.log(obj.x)  // 5
```

<!--

Can you have just a getter for a value or just a setter (instead of having both)?

--

Yes. As an example, it often makes sense to create a getter that calculates a value based on multiple other values.

-->

You can also use `Object.defineProperty` to define getters and setters with additional configuration settings.

[MDN Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### Detecting if an Object has a Specific Property

**Non-Inherited Check**

```js
const obj = { name: 'Bob' };
const hasNameProperty = obj.hasOwnProperty('name');
```

**Inherited or Non-Inherited Check**

```js
const obj = { name: 'Bob' };
const hasNameProperty = 'name' in obj;
```

### Questions About Objects

<--

Are objects mutable or immutable? What's the difference?

--

Objects are mutable, meaning that they can be mutated (modified) without reassignment to another variable.

-->

<--

In the following example, what properties does the object in variable `a` have? Why?

```js
const a = { phone: '555-555-1234' };
const b = a;
b.email = 'foo@email.com';
```

--

It has `phone` and `email`. Variables `a` and `b` are pointing to the same place in memory. A modification to one is a modification to the other.

Objects are assigned by reference, so `a` and `b` are pointing to the same location in memory.

-->

<--

Can you make an object reference itself in a property? If so, then how?

--

The object needs to be created first, then you can add a property that references it.

```js
const o = {
    name: 'Bob'
};
o.me = o;

o.me.me.me.me.me.me.name;       // 'Bob'
```

-->


# This

The JavaScript keyword `this` refers to the current context and is always tied to some object.

```js
const obj = {
  firstName: 'Bob',
  lastName: 'Smith',

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },

  greet: function() {
    return 'Hello, ' + this.name;
  }
}

obj.greet();     // 'Hello, Bob'
obj.firstName;   // 'Bob'
obj.fullName;    // 'Bob Smith'
```

Be aware that the context can be redefined by the caller.

- All functions inherit three properties that allow modification of context. They are `apply`, `bind`, and `call`.

- You call `apply` when you have a collection of parameters and cannot hard code the parameters.

- You call `bind` when you want to generate a new currying function where you specify some of the parameters up front.

- You call `call` when you know exactly how many parameters you have and they are not in a collection.

```js
const obj = {
    name: 'Bob',
    greet: function() {
        return 'Hello, ' + this.name + ' [' + arguments.length + ']';
    }
}

const amy = { name: 'Amy' };

obj.greet();                         // 'Hello, Bob [0]'
obj.greet.call(amy);                 // 'Hello, Amy [0]'
obj.greet.call(obj, 1, 2, 3);        // 'Hello, Bob [3]'
obj.greet.apply(amy, [1, 2, 3]);     // 'Hello, Amy [3]'

const amyGreet = obj.greet.bind(amy, 1);
amyGreet(2,3);                       // 'Hello, Amy [3]'
```

Remember that arrow functions keep the context of their closure.

```js
const alice = {
    name: 'Alice',
    greet: function() {
        return 'Hello, ' + this.name;
    }
}

const bob = {
    name: 'Bob',
    greet: () => 'Hello, ' + this.name
}

alice.greet()  // "Hello, Alice"
bob.greet()    // "Hello, undefined"
```

# Prototype

- Inheritance in JavaScript works through the prototype.

- A prototype is an object that defines properties that will be assigned to new objects.

- Using a prototype reduces performance slightly.

- Using a prototype can have large memory savings.

The following example explores several parts of the prototype:

```js
// create a prototype object
const myPrototype = {
    name: 'stranger',
    greet: function() {
        return 'Hello, ' + this.name;
    }
};

// create an object that inherits the prototype
const obj = Object.create(myPrototype);
obj.greet();                    // returns 'Hello, stranger'
obj.hasOwnProperty('name');     // false
'name' in obj;                  // true

// update name, overshadowing prototype name property
obj.name = 'Bob';
obj.greet();                    // returns 'Hello, Bob'
obj.hasOwnProperty('name');     // true

// overshadow prototype greet property
obj.greet = function() {
    return 'Hola, ' + this.name;
}
obj.greet();        // returns 'Hola, Bob'

// overwrite previous greet, overshadow prototype greet and extend it
obj.greet = function() {
    return Object.getPrototypeOf(this).greet.call(this) + '!';
}
obj.greet();        // returns 'Hello, Bob!'
```

# Constructor Functions

- Any function can be turned into a constructor by calling it with the `new` keyword.

- Because functions inherit from Object they have a prototype that you can add properties to.

```js
function Person (name) {
    if (arguments.length > 0) this.name = name;
}

Person.prototype.name = 'stranger';

Person.prototype.greet = function() {
    return 'Hello, ' + this.name;
}
```

Create an object using the `new` keyword.

```js
const p = new Person();
p.greet();              // 'Hello, stranger'

const bob = new Person('Bob');
bob.greet();            // 'Hello, Bob'
bob.name = 'Robert';
bob.greet();            // 'Hello, Robert'
```

## Constructor Statics

You can also define static properties on a constructor function:

```js
function Person (name) {
    if (arguments.length > 0) this.name = name;
}

// instance property
Person.prototype.name = 'stranger';

// instance property
Person.prototype.greet = function() {
    return 'Hello, ' + this.name;
}

// static property
Person.create = function(name) {
    return new Person(name);
}
```

<--

What is the difference between a static property and an instance property?

--

Instance properties require you to create a new object before you can use them. Static properties cannot be used on instances.

```js
const bob = Person.create('Bob');
const alice = new Person('Alice');

alice.greet();  // 'Hello, Alice'
alice.create(); // throws an Error - create does not exist on the instance
```

-->

## New or Not

A function still has ultimate say in what it returns.

**Force calling using the `new` keyword**

```js
function Person (name) {
    if (!(this instanceof Person)) return new Person(name);
    this.name = name;
}

const alice = Person('Alice');
console.log(alice.name);    // 'Alice'
```

**Return a Different Object than New**

```js
function Cake() {

}

function Person (name) {
    return new Cake()
}

const p = new Person();
p instanceof Person;        // false
p instanceof Cake;          // true
```

# JavaScript Classes

A class is just syntactic sugar on top of the JavaScript prototype. It is less code to write but less flexible too.

**Class Definition**

```js
class Person {
    constructor (name) {
        this.name = name
    }

    greet() {
        return 'Hello, ' + this.name
    }
}

// static method
Person.create = function (name) {
    return new Person(name)
}
```

**Prototype equivalent**

```js
function Person (name) {
    this.name = name
}

Person.prototype.greet = function() {
    return 'Hello, ' + this.name
}

Person.create = function (name) {
    return new Person(name)
}
```

# Factory Functions

- Produce a result.

- Great to use with object composition.

- Take longer to create, consume more memory, but run faster.

- Less confusing.

- Does not matter if you call with or without `new` keyword.

```js
function Person(name) {
    const person = {};

    person.name = arguments.length > 0 ? name : 'stranger';

    person.greet = function() {
        return 'Hello, ' + person.name; // or this.name
    };

    return person;
}
```

# Private Variables

<--

What is a private variable within an object?

--

**Answer:** It is a variable that is accessible within a constructed object but not accessible outside the object.

-->

## Factory Functions

<--

How can we define private variables using the factory function pattern?

*Hint: It has something to do with closures*

--

```js
function Counter(init) {
    const counter = {};
    let num = init || 0;

    counter.increment = function() {
        num++;
    };

    counter.decrement = function() {
        if (num > 0) num--;
    };

    Object.defineProperty(counter, 'value', {
        get: () => num
    });

    return counter;
}
```

-->

## Prototype Classes

<--

How can we define private variables using prototype classes?

--

Private variables can be used inside of the constructor but they are not accessible to the prototype or anywhere else outside of the constructor.

We can use a `WeakMap` to map a reference to an existing instance of an object. Once the instance is decommissioned the `WeakMap` will drop the reference.

```js
const map = new WeakMap()

function Counter(init) {
  if (!(this instanceof Counter)) return new Counter(init)
  map.set(this, init || 0)
}

Counter.prototype.increment = function() {
  const num = map.get(this)
  map.set(this, num + 1)
}

Counter.prototype.decrement = function() {
  const num = map.get(this)
  if (num > 0) map.set(this, num - 1)
}

Object.defineProperty(Counter.prototype, 'value', {
  get: function () {
    return map.get(this)
  }
})
```

<--

What advantages can you think of for creating a counter factory like this as opposed to just having a variable with `num++` or `num--`?

--

You can encompass logic (minimum of zero, can only change value by + or - one).

-->

## ES6 Classes

```js
class Counter {
  
  #num = 0;

  increment () {
    num++;
  }

  decrement () {
    if (num > 0) num--;
  }

  get value () {
    return num;
  }

}
```

# Property Chaining

- Allows multiple operations within a single statement.

- Simplifies functional programming. (More on this soon.)

```js
function Counter(init) {
    const counter = {};
    let num = init || 0;

    counter.increment = function() {
        num++;
        return counter;
    };

    counter.decrement = function() {
        if (num > 0) num--;
        return counter;
    };

    Object.defineProperty(counter, 'value', {
        get: () => num
    });

    return counter;
}

// value === 2
const value = Counter(0).increment().increment().increment().decrement().value;
```

# Classical Inheritance vs Object Composition

**Class Syntax**

```js
class Person {
    constructor (name) {
        this.name = name
    }
    greet () {
        return 'Hello, ' + this.name
    }
}

class Student extends Person {
    constructor (name, grade) {
        super(name)
        this.grade = grade
    }
    status () {
        return this.name + ' has the grade ' + this.grade
    }
}

let student = new Student('Alice', 'A')
student.greet()     // 'Hello, Alice'
student.status()    // 'Alice has the grade A'
```

**Functions with Prototype**

```js
function Person (name) {
    this.name = name
}

Person.prototype.greet = function () {
    return 'Hello, ' + this.name
}

function Student (name, grade) {
    Person.call(this, name)
    this.grade = grade
}

Student.prototype = Object.create(Person.prototype)
Student.constructor = Student

Student.prototype.status = function () {
    return this.name + ' has the grade ' + this.grade
}

let student = new Student('Alice', 'A')
student.greet()     // 'Hello, Alice'
student.status()    // 'Alice has the grade A'
```

<--

Why would JavaScript use the prototype as it's native model for inheritance when it is more complex?

--

1. The concept of classical inheritance is flawed and too many developers don't know that.

2. Prototypes allow you to use object composition (which is significantly better) with inheritance.

-->

## What's wrong with Classical Inheritance?

Illustrated example:

1. You have the **Person class** that stores a **name** and a **greet** method.

2. You have **Student class** that inherits from the **Person class** and also stores the student's **grade** and a **status** method.

3. You have an **Employee class** that inherits from the **Person class** and also stores the employee's **salary** and a method to **fire** the employee (ouch).

<--

What happens when a person is both a student and an employee?

--

You have a few options:

1. Bad idea: Create two objects to represent the same person. One is the student object and one is the employee object.

2. Bad idea: Have employee inherit from Student. (The employee may not be a student.)

3. Bad idea: Have the student inherit from Employee. (The student may not be an employee.)

4. Good idea: Don't use inheritance, use object composition.

-->

## Object Composition

We already talked about this at the start of the lesson. We said that object composition is:

- The act of building objects piece by piece.

- Creating objects directly.

**Example**

```js
function makePerson (name) {
    return {
        name: this.name,
        greet: function greet () {
            return 'Hello, ' + this.name
        }
    }
}

function makeStudent (person, grade) {
    person.grade = grade
    person.status = function status() {
        return this.name + ' has the grade ' + this.grade
    }
}

function makeEmployee (person, salary) {
    person.salary = salary
    person.fire = function () {
        delete person.salary
        delete person.fire
    }
}

// Bob is a student
const bob = makePerson('Bob')
makeStudent(bob)

// Alice is an employee
const alice = makePerson('Alice')
makeEmployee(alice)

// Alice was fired but is now a student
alice.fire()
makeStudent('alice')
```

**Pro Tip**

Inheritance is not bad, but it is easy to do wrong. Favor object composition in most cases.

# Errors

Creating an error is simple. (The *new* keyword is optional.)

```js
const err = new Error('This is an error');
```

Errors are not too useful unless you throw them:

```js
throw Error('This is an error');
```

It can be useful to add a code property to your error so you know what type of error it is. This is a common practice.

```js
const err = new Error('This is an error');
err.code = 'MY_ERROR';
throw err;
```

Sometimes you can recover from an error safely if the error was not entirely unexpected. For example, you may attempt to use AJAX and have the contingency that if it fails you'll try a different URL.

If you catch an error but cannot recover from it safely then you need to rethrow the error.

```js
try {
    const num = Math.random() * 3;
    if (num < 1) throw Error('Too low');
    if (num < 2) throw Error('Recoverable');
} catch (err) {
    if (err.message !== 'Recoverable') throw err;
}
```

Every time you create an error it also creates a stack trace that can be used to determine where the error occurred and what led up to it.

```js
function stayPositive(num) {
    if (num > 0) {
        stayPositive(num - 1);
    } else {
        throw new Error('Number is not positive: ' + num);
    }
}

try {
    stayPositive(10);
} catch (err) {
    console.log(err.stack);
}

/* will log this out:
Error: Number is not positive: 0
    at stayPositive (/home/james/Programming/temp/index.js:5:15)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
    at stayPositive (/home/james/Programming/temp/index.js:3:9)
*/
```

# Arrays

There are many ways to create an Array, but here is the simplest:

```js
const ar = [];
```

- Each item in the array can store any data type.

- Data types do not need to be consistent between items.

- The Array inherits from Object and has multiple properties.

- The `Array.prototype.length` property returns the length of the Array.

```js
const ar = [1, 'a', {}];
ar.length;      // 3
```

## Array Manipulation

**Set an item**

```js
const ar = [];
ar[0] = 'First';
```

**Get an item**
```js
const ar = ['First'];
const x = ar[0];      // 'First'
```

**Other Useful Methods**

Look these up on the web for details: [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

- `Array.prototype.push` - Add an item to the end of the array.
- `Array.prototype.pop` - Remove an item from the end of the array.
- `Array.prototype.unshift` - Add an item to the front of the array.
- `Array.prototype.shift` - Remove an item from the front of the array.
- `Array.prototype.splice` - Add and/or remove items in the array at a specified index.
- `Array.prototype.slice` - Copy a portion of the array.

<--

What is dangerous about the following function? How could we fix it?

```js
function joinStrings(ar) {
    let result = '';
    while (ar.length > 0) result += ar.shift();
    return result;
}
```

--

The developer who is calling the function may not know that the array passed in is being manipulated. It would be better to not manipulate the passed in array.

```js
function joinStrings(ar) {
    let result = '';
    const copy = ar.slice(0);
    while (copy.length > 0) result += copy.shift();
    return result;
}
```

Also, there is already a function that does this, `Array.prototype.join`:

```js
const ar = ['The', 'quick', 'brown', 'fox'];
const str = ar.join(' ');   // 'The quick brown fox'
```

-->

# Functional Programming

- Same input always produces same output.

- Does not modify state outside of itself.

- Fewer bugs.

Arrays provide a good introduction to functional programming.

1. We'll take the following input: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`.
2. We'll strip out the even numbers.
3. We'll multiply each remaining entry by `2`.
4. We'll sum the remaining numbers.

**Imperative Solution**

```js
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = calculate(input);

function calculate(input) {
    let i;
    let sum = 0;
    for (i = 0; i < input.length; i++) {
        if (input[i] % 2) {
            sum += input[i] * 2;
        }
    }
    return sum;
}
```

**Functional Solution**

```js
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = input
    .filter(v => v % 2)
    .map(v => v * 2)
    .reduce((prev, curr) => prev + curr, 0);
```

# Destructuring

A way to extract parts of an object or an array into variables.

**Array Destructure**

In this example we skip the second and last items in the array.

```js
const array = [ 1, 2, 3, 4 ]
const [ one, , x ] = array
console.log(one)  // 1
console.log(x)    // 3
```

**Object Destructure**

In this example we pull out the properties `one` and `three` but we rename `three` to `x`.

```js
const obj = {
    one: 1,
    two: 2,
    three: 3
}
const { one, three: x } = obj
console.log(one)  // 1
console.log(x)    // 3
```
