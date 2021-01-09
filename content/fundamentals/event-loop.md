---
title: Asynchronous JavaScript
description: JavaScript is single threaded but uses an event-loop to offload work the sub processes.
---

## Processes, CPU's, and Threads

- Today's CPU's offer multiple cores.
- Some CPU's only offer single threads. Some CPU's offer hyper threading (two threads per processor).
- Each thread can run one process at a time.
- CPU's are very good at swapping very quickly which process is running. Instead of multi-tasking each thread runs one process for a few milliseconds, then another, etc.
- Each thread offers a finite amount of processing power.

## The Event Loop

JavaScript runs on a single process, but it assigns out work for other processes to do. This gives JavaScript the power of multi-threaded processing without dealing with the insane complexities of multi-threaded applications.

Here is how JavaScript runs:

1. Run current instructions (lines of code) until there are no more lines to run.
2. Check to see if there is anything ready on the event loop. If so run the next item on the loop (go back to step 1).
3. If there is something on the event loop but its not ready then wait until something is ready.

<image-zoom alt="Event Loop Diagram" src="/full-stack-dev/images/javascript-event-loop.png"></image-zoom>


## An Introduction to the NodeJS FS Core Module

- We are going to create a JavaScript file that reads a file.
- First read a file using [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options). This is a synchronous blocking operation.
- Next read a file using [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) that uses a callback. This is an asynchronous non-blocking operation.
- Notice that the callback gets two parameters: error and data.

<question-answer q="We are passing a callback function to `fs.readFile`. How does our callback function get called?">

The callback is being called by `fs.readFile` once it has read the file.

</question-answer>

<question-answer q="What decides the parameters the callback function will be called with, the callback function itself or `fs.readFile`? Why?">

`fs.readFile` is the calling function so it gets to decide which parameters it will send to our callback function. Remember that the calling signature does not need to match the function definition's signature.

</question-answer>

## Examples

There are some examples files we can use to look more into the behaviour of synchronous vs asynchronous functions.

- Use git to clone the repository: `https://github.com/Gi60s/it410-resources.git`
- Navigate into the directory: `async`
- We need to initialize the files. Run the command: `node 0-make-files`
- This will generate three large files (`small.txt`, `medium.txt`, and `large.txt`) into the `async/files` directory.
- You will probably want to delete these files when we're done with the examples.

### Synchronous Blocking

- File name: `1-sync.js`
- This will read each of the files using synchronous blocking functions.
- The time to read each file will be output (in milliseconds) as well as the total time.
- Run the example: `node 1-sync`

### Asynchronous Non-blocking

- File name: `2-async.js`
- This will read each of the files using asynchronous non-blocking functions.
- The time to read each file will be output (in milliseconds) as well as the total time.
- Run the example: `node 1-sync`

<question-answer q="There is something wrong with the output. Can you tell what the code did wrong?">

The event queue had not yet resolved the asynchronous requests when we logged the total time.

</question-answer>

### Available Event Loop

- File name: `3-event-queue.js`
- This will add an event to the event queue that should run after 100 milliseconds, as soon as the process is idle.
- The event will trigger a function call that will output the delay.
- Run the example: `node 3-event-queue`

### Unavailable Event Loop

- Now uncomment the synchronous blocking call to read the large file.
- Run the example again and observe the change in time.
- The event appeared on the event queue at 100 milliseconds but the process was busy for a while before it could fire the event's callback function.

### Asynchronous Sequential

- File name: `4-async.js`
- Will load all three files asynchronously and output the time for each as well as the total time.
- Run the example: `node 4-async`

<question-answer q="Why wasn't this any faster than the synchronous blocking code?">

We didn't start to read the next file until the previous had finished. We didn't block the process so it could have done other things, but it waited on the previous file before loading the next file.

</question-answer>

<question-answer q="How can we read all three files simultaneously and report their load times and the total read time?">

Look at the example in `5-async.js`.

</question-answer>

## Promises

- Callbacks provide a nice way to use asynchronous functions.
- Unfortunately they can create the "pyramid of doom" a.k.a. "callback hell".
- Under complex conditional asynchronous programming they become difficult to manage flow.
- Promises resolve these issues.
- A Promise is a JavaScript object.

### Terminology

Here are some terms you should be familiar with and that you should use when talking about promises.

- **promise** - An object with a `then` method whose behavior conforms to the [A+ Promise specifications](https://promisesaplus.com/)
- **resolve** - If a promise completes successfully then the promise has been *resolved* and it returns a *value*.
- **reject** - If a promise does not complete successfully then the promise has been *rejected* and it returns a *reason*.
- **reason** - The value that indicates why the promise was *rejected*.
- **value** - The value that was returned by a successful promise resolution.

### Converting from Asynchronous Callbacks to Promises

Converting from asynchronous callbacks to promises is all about moving where the callback is called.

In the following example we create a function that will read a file and call either the success callback (if the file is read successfully) or error callback (if an error occurred).

```js
function myReadFile (filePath, successCallback, errorCallback) {
  fs.readFile(filePath, 'utf8', function (err, content) {
    if (err) {
      errorCallback(err)
    } else {
      successCallback(content)
    }
  })
}

myReadFile('/path/to/file.txt',
  content => {
    console.log(content)
  },
  err => {
    console.error(err.stack)
  })
```

In the below example we use the promise paradigm to do the same thing as above.

```js
function myReadFile (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, content) {
      if (err) {
        reject(err)
      } else {
        resolve(content)
      }
    })
  })
}

myReadFile('/path/to/file.txt')
  .then(function (content) {
    console.log(content)
  })
  .catch(function (err) {
    console.error(err.stack)
  })
```

<question-answer>
<template v-slot:question>

How would we convert the following asynchronous callback to a promise? How would we call it?

```js
function delay (duration, callback) {
  const start = Date.now();
  setTimeout(function () {
    callback(Date.now() - start) // send back actual delay duration
  }, duration)
}

delay(1000, function (actualDuration) {
  console.log('Hello after ' + actualDuration + ' milliseconds')
})
```

</template>

```js
function delay (duration) {
  return new Promise(resolve => {
    const start = Date.now();
    setTimeout(function () {
      resolve(Date.now() - start) // resolve to actual delay duration
    }, duration)
  })
}

delay(1000)
  .then(function (actualDuration) {
    console.log('Hello after ' + actualDuration + ' milliseconds')
  })
```

</question-answer>

<question-answer>
<template v-slot:question>

How would we rewrite the following function to allow it to be used with a callback or a promise paradigm?

```js
function delay (duration, callback) {
  const start = Date.now();
  setTimeout(function () {
    callback(Date.now() - start) // send back actual delay duration
  }, duration)
}
```

</template>

```js
function delay (duration, callback) {
  const p = new Promise(resolve => {
    const start = Date.now();
    setTimeout(function () {
      resolve(Date.now() - start) // resolve to actual delay duration
    }, duration)
  })
  if (!callback) return p
  p.then(callback)
}
```

</question-answer>

## Chaining Promises

Each promise's `then` and `catch` function returns another promise, making it possible to chain multiple promises together.

Using the promise version of delay function we created above, look at the following examples promise chaining.

**Example 1**

```js
delay(500)
  .then(actualDelay => {
    return 'The actual delay was ' + actualDelay
  })
  .then(message => {
    console.log(message) // The actual delay was 502
  })
```

**Example 2**

```js
let totalDelay = 0
delay(500)
  .then(actualDelay => {
    totalDelay += actualDelay
    return delay(500)
  })
  .then(actualDelay => {
    totalDelay += actualDelay
    console.log('Total delay: ' + totalDelay) // Total delay: 1001
  })
```

## Catching Rejected Promises

You can catch rejected promises if you think it's possible to recover from them.

<question-answer q="What is an example of an error that could possibly be recovered from?">

Node's core `fs` module used to have a function that checked for the existence of a file. This became deprecated because people would 1) check to see if the file existed then 2) delete the file if it existed.

The problem with this is that because the operations were asynchronous people would check if the file was there, it would say yes, then there was a possibility that before the file could have been deleted right before they then told it to be deleted.

This behavior was discouraged to instead just attempt to delete the file and if the file didn't exist it would produce an error that could be handled.

</question-answer>

Promises have two ways to catch promises:

```js
function success() {
  console.log('Success')
}

function failure() {
  console.log('Failure')
}

// Example 1
getPromise() // a made up function that supposedly returns a promise
  .then(success, failure)

// Example 2
getPromise() // a made up function that supposedly returns a promise
  .then(success)
  .catch(failure)
```

<question-answer q="How do these two examples act differently?">

If the promise resolves then the success function gets called in both examples, but if the success function threw an error then only the second example would catch the error.

</question-answer>

## Promise.all

This is great for allowing multiple promises to run simultaneously but waiting until they are all finished to continue.

Promise.all returns a promise that resolves to an array of the results if all promises resolve or rejects if one promise rejects.

```js
const p1 = delay(500)
const p2 = delay(500)
const p3 = delay(500)

Promise.all([p1, p2, p3])
  .then(results => {
    console.log('Actual delay 1: ' + results[0])
    console.log('Actual delay 2: ' + results[1])
    console.log('Actual delay 3: ' + results[2])
  })
```

## Generators

A generator is a JavaScript function that can be paused mid operation, allowing other code that is on the event loop to run.

You will probably never have to worry about the implementation details of generators, so this is mostly to give you a background.

See example `6-generators.js`.

## Async and Await

Async functions use generators and promises to make your code easier to write.

- You must use the `async` keyword so that you can use the `await` keyword in the function.
- Functions that are `async` will always return a promise.
- You can only `await` promises.

**Example 1**

```js
async function foo () {
  let actual = await delay(500)
  actual += await delay(500)
  actual += await delay(500)
  return actual
}

foo()
  .then(actual => {
    console.log('Actual: ' + actual) // Actual 1502
  })
```

**Example 1**

```js
async function foo () {
  const p1 = delay(500)
  const p2 = delay(500)
  const p3 = delay(500)
  const results = await Promise.all([p1, p2, p3])
  return results[0] + results[1] + results[2]
}

foo()
  .then(actual => {
    console.log('Actual: ' + actual) // Actual 501
  })
```

See also example `7-async-await.js`.
