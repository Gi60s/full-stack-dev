---
title: JavaScript Callbacks
description: Learn about functional programming and how it's useful for asynchrnous programming.
---

## What Are Callbacks

Callbacks are one of the paradigms available to JavaScript.

Pass a function (A) to another function (B) as a parameter. Function B calls Function A.

<question-answer q="Why would you pass a function into another function as a parameter?">

Most commonly it is to have the function that receives the input parameter (function) call that function (input parameter).

</question-answer>


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

<question-answer q="Which function gets to decide the parameters that `greet` will be called with?">

The function `repeat` calls `greet`, so it gets to decide what parameters it passes when it calls `greet`.

</question-answer>
