---
title: NodeJS and NPM 
description: A brief introduction to how NodeJS works.
---

## JavaScript Recap

### About JavaScript

- JavaScript is a scripted language.
- An interpreter reads the code and executes it.
- Web Browsers that are capable of executing JavaScript have a JavaScript interpreter.
- The interpreters are known as JavaScript engines.
- Most browsers have their own JavaScript engine, but some share the same engine.
- NodeJS takes Chrome's V8 engine and uses it to run JavaScript on a server.

### Browser JavaScript vs Server JavaScript

- The language is identical.
- The libraries are mostly different.
    - Browser specific libraries: window, document, DOM, alert, etc.
    - NodeJS specific libraries: file system, network, operating system, cryptography, etc.
- In browser JavaScript, all files share the same global scope.
- In NodeJS, all files are automatically wrapped in a closure.

## First NodeJS File

**Exercise**

Create a [factory function](javascript.md#factory-functions) that returns an object that enables us to do the following:

1. Add a string to the end of an array if it is unique.
2. Remove existing strings from the array.
3. Get an array of all of the strings in the array. Do not allow mutation of the internal array.
4. Get the number of entries.

You may want to refer to the [MDN Array Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

<question-answer q="How would you write a factory function that accomplishes the above?">

This is one way you could write it.

```js
function StringList () {
  const factory = {}
  const store = []
  
  factory.add = function (string) {
    if (!store.includes(string)) store.push(string)
    return factory
  }

  factory.remove = function (string) {
    const index = store.indexOf(string)
    if (index >= 0) store.splice(index, 1)
    return factory
  }

  factory.list = function () {
    return store.slice(0)
  }

  Object.defineProperty(factory, 'count', {
    get () {
      return store.length
    }
  })
  
  return factory;
}

const list = StringList()
list.add('one')
list.add('two')
list.add('three')
console.log(list.count) // 3
console.log(list.list()) // ['one', 'two', 'three']
```

</question-answer>

## Modules

<question-answer q="What does it mean if something is modular?">

It is constructed in such a way that it can be easily reused in a variety of ways.

</question-answer>

<question-answer q="What is a module in code?">

It is a small set of code with a specific purpose. It is reusable in many instances and along with other modules to produce code with more complex capabilities.

</question-answer>

In NodeJS:

- Each file is a module.
- Each module (file) is automatically wrapped with a closure. To be precise, this closure: [NodeJS Module Wrapper](https://nodejs.org/api/modules.html#modules_the_module_wrapper)
    ```js
    (function (exports, require, module, __filename, __dirname) {
        // Your module code actually lives in here
    });
    ```
- We can use the `exports` object to expose content inside our module to outside modules.
- We can get that `exports` object in a different module by using the `require` function from that other module.

### Create a Module

This NodeJS module exports the StringList factory we created earlier so that it can be used elsewhere in our code.

**string-list.js**

```js
exports.stringList = function () {
  const factory = {}
  const store = []
  
  factory.add = function (string) {
    if (!store.includes(string)) store.push(string)
    return factory
  }

  factory.remove = function (string) {
    const index = store.indexOf(string)
    if (index >= 0) store.splice(index, 1)
    return factory
  }

  factory.list = function () {
    return store.slice(0)
  }

  Object.defineProperty(factory, 'count', {
    get () {
      return store.length
    }
  })
}

// this still runs the first time we require counter.js
console.log('String list factory created')
```

### Require a Module

NodeJS currently uses the CommonJS `requires` model. In the future it will use the ES6 module model.

**index.js**

```js
const myFactory = require('./string-list')      // get the counter.js module

const stringList = myFactory()
stringList.add('one')
stringList.add('two')
stringList.add('three')
console.log(stringList.count) // 3
console.log(stringList.list()) // ['one', 'two', 'three']
```

### Modules are Intended to Create APIs

<question-answer q="What is an API?">

It is an interface that provides some set of functionality. Imagine a black box that does a lot of stuff, but you don't care about the details of how it does it, you just need to be able to tell it to do it for you.

The `string-list.js` module exposes the StringList factory API.

</question-answer>

### More About the Module Wrapper

```js
(function (exports, require, module, __filename, __dirname) {
  // Your module code actually lives in here
  exports.stringList = function () {
    const factory = {}
    const store = []
    
    factory.add = function (string) {
      if (!store.includes(string)) store.push(string)
      return factory
    }
  
    factory.remove = function (string) {
      const index = store.indexOf(string)
      if (index >= 0) store.splice(index, 1)
      return factory
    }
  
    factory.list = function () {
      return store.slice(0)
    }
  
    Object.defineProperty(factory, 'count', {
      get () {
        return store.length
      }
    })
  }

  // this still runs the first time we require counter.js
  console.log('String list factory created')
});
```

- *exports* - An empty object that you can put properties on.
- *require* - A function that will get the value from the `module.exports` property of another file.
- *module* - An object with various properties. This object represents the current file as a module.
    - This object has a property `exports` that is the same object as the exports variable. In other words: `exports === module.exports`
    - Because of this you can export something other than an object from a module. More on this soon.
- *__filename* - The filename plus full path on the hard drive to this current file.
- *__dirname* - The full directory path for the directory that contains this file.

When another module requires this module, it executes the module as an [IIFE](/javascript#iife---immediately-invoked-functional-expression).

The following code example is not actually how the module get's required, it's more of a pseudo code to illustrate the point.

```js
const module = {
  exports: {}
}

function require (modulePath) { ... }

(function (exports, require, module, __filename, __dirname) {
  // Your module code actually lives in here
  exports.x = 'Some value'
})(module.exports, require, module, '/path/to/module.js', '/path/to');
```

### Exporting Something Else

If you want to export a something other than an object you can use `module.exports`.

This WILL NOT work:

```js
exports = function() { ... }
```

This WILL work:

```js
module.exports = function() { ... }
```

<question-answer q="What is the difference between these two examples?">

The first example reassigns `exports` to a new value. The second example mutates the `module` object by updating a property on it.

</question-answer>

Also remember that `require` gets the value from the `module.exports` property.

## NodeJS Core Modules

- There are many core modules for NodeJS that allow you to interact with many parts of the server: file system, network, operating system, cryptography, etc.
- [API Documentation](https://nodejs.org/en/docs/)

## Packages

- A package is a set of modules that are combined to produce a single API interface.
- Node has a package manager called `npm`.
- npm can be used for:
    - Getting packages off the internet.
    - Keeping package dependencies up to date.
    - Deploying packages.
    - Providing run scripts for packages.
    - etc.
- Each project you work on is a package, whether it gets published or not.

### Create a Package

1. From a terminal run `npm init` and follow the prompts.
2. Now we have a `package.json` file.
    This file contains information about our package:
    - Dependencies and their versions.
    - Run scripts.
    - Version
    - Name
    - etc.
3. If you don't want to publish a package by mistake then you specify that the package is private in your `package.json`:
    ```json
    {
        ...
        "private": true
    }
    ```

### Getting a Package Dependency

We're going to get the `express` package that makes it easy to create a custom server.

1. From the terminal run `npm install express`
    - Notice that `package.json` now has the `express` dependency.
    - This package come from https://npmjs.com
    - The [npmjs.com](https://npmjs.com) website is the official repository for all published packages.
2. Lookup the express package to see documentation on how to use it.

## NPM Run Scripts

What is an NPM run script?

- Allows you to define an alias for a command.
- Runs the command with the `node_modules` directory in the path.

You define your run scripts in the `package.json` file like this:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "start": "node index",
    "test": "mocha server/test",
    "debug": "node inspect index"
  }
}
```

And you execute the scripts from the terminal like this:

- `npm start`
- `npm test`
- `npm run debug`

Note that scripts named `start` and `test` are the only scripts that can be run without the `run` command and all other tests must use the `run` command.
