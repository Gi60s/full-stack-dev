---
title: Browser Events
toc: 1
---

# Events

- The browser is constantly producing events.

- Some events have to do with changes that are occurring on the page while others have to do with user interactions with the page.

- Events are often attached to DOM nodes.

- You can subscribe (or unsubscribe) to events.

- Some events can come from other sources: service workers, web sockets, etc.

- Even though events are always being fired you need to listen for them to utilize them.

## Subscribing, Unsubscribing, and Dispatching

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget

- `addEventListener(type, callbackHandler)` - Tell a node to start listening to a specific event and call the handler when it occurs.

- `removeEventListener(type, callbackHandler)` - Tell a node to stop listening to remove the callback handler that is listening to an event. You will need a reference to the original function where you started listening to the event.

- `dispatchEvent(eventObject)` - Emit a non-native event from the target object.

**Example**

The following example listens for a click event on just the `my-element` Node and then removes the listener once it has run once.

```js
const el = document.getElementById('my-element')
const handler = function (event) {
  if (event.target === el) {
      console.log('You clicked my-element')
      el.removeEventListener('click', handler)
  }
}
el.addEventListener('click', handler)
```

## Click Events

1. Using Git, clone the repository: `https://github.com/Gi60s/it410-resources.git`.

2. Open the file for editing: `browser-events/click-bubble/index-starter.html`.

3. Open the file `browser-events/click-bubble/index-starter.html` in your browser of choice.

4. Add event listeners for the inner, middle, and outer `<div>` elements that log to the console when clicked.

5. Interact with the web page to observe behavior.

## DOM Events

- Events on elements in the DOM propagate upward from the element that emitted the event.

- Once the event has gone as high as it can the event hit's the browser and the browser may take an action based on the event.

- Event propagation can be stopped with `event.stopPropagation()` or the browser can be told not to handle the event with `event.preventDefault()`.

## Stop Propagation

1. Open the file `/browser-events/click-bubble-stop/index-starter.html` in your editor and in your browser.

2. Add an `event.stopPropagation()` to one of the handlers.

3. Interact with the web page to observe behavior.

## Prevent Default

1. Open the file `/browser-events/reverse-scroll/index-starter.html` in your editor and in your browser.

2. Interact with the web page by hitting keys on the keyboard. You can see the key code for which key was pressed in the console.

3. Notice that using the up and down arrow keys has a default behavior of scrolling the window.

4. Add an `event.preventDefault()` to the keydown handler.

5. Interact with the web page to notice the scrolling no longer works. Using `event.preventDefault()` will stop the browser from taking any key down based actions.

6. Call `window.scrollBy` to enable scrolling in reverse: up arrow scrolls down, down arrow scrolls up.

<--

What are some ideas that you could use browser events for?

--

- You can create a modal window that closes when the escape key is pressed.

- You can create drag and drop functionality by using the events `mousedown`, `mouseup`, `mousemove`.

- You can run a form through validation prior to submitting. If there is an error then `e.preventDefault()`.

- Infinite possibilities.

-->
