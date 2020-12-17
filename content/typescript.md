---
title: Typescript
description: Use syntactic sugar, forward features, and strict types with TypeScript.
---

## Build Tools

TypeScript is a superset of JavaScript. It has all of the functionality of JavaScript, but adds some features.

You write TypeScript (that is very similar to JavaScript) and that has to be transpiled into JavaScript.

<question-answer q="What does it mean to transpile?">

Transpiling is the act of converting code written in one language into code in another language.

When we say we transpile TypeScript into JavaScript, we're saying that we convert TypeScript code into JavaScript code?

</question-answer>

<question-answer q="Why do you think it's important to transpile TypeScript to JavaScript?">

Web browsers understand HTML, CSS, JavaScript, and Web Assembly.

- HTML defines the structure of your web page.
- CSS defines the look of your web page.
- JavaScript allows you to interact with and manipulate your webpage.
- Web Assembly is used for performing intensive calculations, but cannot interact with your webpage directly.

If you write in TypeScript it must be transpiled into JavaScript so that the code can execute.

</question-answer>

## TypeScript Types

One of the biggest benefits of TypeScript is specifying the type for your variables, parameters, and returned values.

- [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) - Includes booleans, numbers, strings, arrays, objects, void, undefined, null, and more.
- [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) - Great for defining the structure of an object.

**Example**

There are more examples at the links above, but this is a brief example that shows a few concepts off.

```ts
// define a reusable union type
type stringOrBoolean = string | boolean

// define a complex interface
interface MyObject {
  // required property
  propertyA: string

  // optional property
  propertyB?: number

  // propertyC is an object with any property names (so long as thy are strings)
  // and each value is an object with the required properties a and b
  propertyC: {
    [key: string]: {
      a: string | string[]
      b: stringOrBoolean
    }
  }
}

// create an object that uses our MyObject interface
const o: MyObject = {
  propertyA: 'hello',
  propertyC: {
    x: {
      a: ['a', 'b', 'c'],
      b: false
    }
  }
}
```

## ES Modules

TypeScript uses the ES Modules syntax for importing and exporting. When using NodeJS mostly we see the `CommonJS` syntax. The table below highlights some of the differences between these syntaxes.

| CommonJS | ES Modules Equivalent | Description |
| -------- | --------------------- | ----------- |
| `const fs = require('fs')` | `import fs from 'fs'` or <br> `import * as fs from 'fs'` or <br> `import default as fs from 'fs'` | Import the entirety of another module. |
| `const { readFile } = require('fs')` or <br> `const readFile = require('fs').readFile` | `import { readFile } from 'fs'` | Import just the readFile function. |
| `exports.myFunction = function () {}` | `export myFunction () {}` | Export a function called `myFunction` |
| `module.exports = function () {}` | `export default function () {}` | Export a default function. |

You can read more about ES module [imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) on MDN.

## Typescript Configuration

- Because TypeScript is transpiled into JavaScript, you may want to specify how it should transpile.
- You can create a `tsconfig.json` file that contains your TypeScript and transpiler configuration settings.
- [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- A [base configuration](https://github.com/tsconfig/bases/) can be used to adopt common settings.

**Example `tsconfig.json` file for NodeJS v14**

```json
{
  "extends": "@tsconfig/node14/tsconfig.json",

  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceRoot": "./src",

    "noImplicitAny": true,
    "preserveConstEnums": true,
    "removeComments": true,
    "esModuleInterop": true,

    "declaration": true,
    "sourceMap": true
  }
}
```

## Declaration Files

- TypeScript that is transpiled to JavaScript does not retain types.
- The transpiled JavaScript does not validate that types are correct, the IDE does that work.
- Declaration files can let the IDE know what the types are for the transpiled code so that it can continue to provide developer assistance.
- Declaration files have the extension `*.d.ts`. 

## Source Map Files

- When code is run, it runs the transpiled JavaScript, not the TypeScript.
- When debugging your code don't want to step through transpiled code because it's hard to read and relate to what you wrote in TypeScript.
- A source map tells the debugger how to translate from the location of code in the JavaScript to the location of that same code in TypeScript.
