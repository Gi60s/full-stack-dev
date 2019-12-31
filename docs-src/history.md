---
title: History of the Web
toc: true
---

# Static Content

In the beginning

- The internet was very slow
- Web pages content was static; the content was the exact same for every visitor
- Visitor's were indistinguishable
- Consisted of text, images, links
- Servers contained the content as HTML or binary (images) and sent it to clients (browsers)
- Browsers received the content, interpreted it, and presented it

Example of a Static Page's HTML

```html
<html>
<head>
  <title>A Static Page</title>
</head>
<body>
  Hello, World!
</body>
</html>
```

<span class="question">What does HTML stand for?</span>
<span class="answer">Hyper-Text Markup Language</span>

# Personalized Content

- Web pages began to allow user's to log in
- Servers could create custom HTML content per user, sending it to the client (browser)
- The client (browser) could not distinguish between content from static files or content that was dynamically generated.
- In cases of high demand servers would be upgraded with better hardware.

Example of a Dynamic Page's HTML / PHP

```html
<?php session_start(); ?>
<html>
 <head>
  <title>A Dynamic Page</title>
 </head>
 <body>
    Hello,
    <?php
    if (isset($_SESSION)) {
        echo $_SESSION['userName']
    } else {
        echo "stranger"
    }
    ?> 
 </body>
</html>
```

<span class="question">What does PHP stand for?</span>
<span class='answer'>Pre Hyper-Text Processor. It runs code that generates the Hyper-Text.</span>

# Dynamic Content without Reload

The client became smarter

- The server could still send dynamic content to the client (browser)
- The server sent JavaScript to the client (browser)
- The client could execute the JavaScript to modify the display and respond to user actions with the server
- The server began to provided data without presentation information, sending XML and then JSON instead of HTML
- AJAX allowed the browser to send requests to the server without reloading the web page when then allowed the browser to further update it's display, etc

Example of JavaScript

```html
<html>
<head>
  <title>A Static Page</title>
</head>
<body>
  The time is <span id="time"></span>
  <script>
    document.getElementById('time').innerHTML = new Date().toString();
  </script>
</body>
</html>
```

<span class="question">What does AJAX stand for?</span>
<span class="answer">Asynchronous JavaScript and XML. At its inception XML was the primary data transfer format. JSON is the current data transfer format.</span>

# Dev Ops

Distributed systems, micro services, automated testing, continuous integration and deployment become requirements to keep up with the demands of IT.
