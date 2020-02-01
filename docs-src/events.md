---
title: Events
toc: 1
---

# Event Paradigm

Event driven programming introduces a paradigm shift:

- Use events and reactions to events to execute code.

- Can allow for loose coupling of code. In other words, code is less dependent on other pieces of code.

- Improves flexibility in your code, making it easy to add features without compromising existing features.

- Everything is asynchronous.

- Is generally harder to debug.

- Becoming more common.

# Callbacks and Promises

- The callback paradigm and promises use events that are tightly coupled.

- You call a function that will cause an event that calls the callback provided.

- For tightly coupled code we might say: *read this file then call this function*

This example shows a tightly coupled event based callback function.

```js
const fs = require('fs');
fs.writeFile('./file.txt', 'Hello, World', function(err) {
    console.log(err, data);
});
```

# Loosely Coupled Events

- Loosely coupled events use a subscription model.
 
- For loosely coupled code we might say: *when any file is read call this function*

- In NodeJS we can use loosely coupled events using the [EventEmitter](https://nodejs.org/dist/latest-v6.x/docs/api/events.html).

- Check out an example from `https://github.com/Gi60s/it410-resources` in the `event-driven` directory.

    - There are several race horses

    - Each race horse emits two types of events: `progress` and `finish`

    - There are two subscribers to the `progress` event: `lead` - tells which horse is in the lead, `progress` - tells which turn the horse is at.

    - There is one subscriber to the `finish` event that tells when each horse finishes.

<--

Can you think of a situation where using events would be helpful?

--

Some examples:

1. Denormalized databases can use events to keep the denormalized data in sync.

2. Some requests may take a long time to run and require asynchronous communication.

3. Pushing data through a stream without waiting for a request.

-->
