---
title: History of the Web
toc: true
---

# Web 1.0

By the early 1990's Web 1.0 was commercially available.

- The internet was very slow.
- Web pages content was static; the content was the exact same for every visitor.
- Visitor's were indistinguishable.
- Content consisted of text, images, links.
- Servers contained the content as HTML or binary (images) and sent it to clients (browsers).
- Browsers received the content, interpreted it, and presented it.

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

<--

What is HTML?

--

Hypertext Markup Language. It is a descriptive language that web browsers interpret to determine the layout of a loaded web page.

-->

# Web 2.0

In the early 2000's Web 2.0 began.
    
- Web pages began to allow user's to log in.
- Servers could create custom HTML content per user, sending it to the client (browser).
- Applications began to be built on the web.
- Birth of YouTube, Twitter, Facebook

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

<--

What is the difference main between Web 1.0 and Web 2.0?

--

Web 1.0 provided the same content to all users, like visiting a website to read a scholarly article.

Web 2.0 is about web applications and personalized content.

-->

# Rich Client Applications

The client became smarter.

- The server could still send dynamic content to the client (browser).
- The server sent JavaScript to the client (browser).
- The client could execute the JavaScript to modify the display and respond to user actions with the server.
- Data and presentation layers began to be decoupled.
- AJAX allowed the browser to send requests to the server without reloading the web page when then allowed the browser to further update it's display, etc.
- Web Services and REST API's became common.

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

<--

What is JavaScript?

--

JavaScript is the programming language of web browsers. It is the only way that you can modify content in the browser without having to load those changes from a server.

JavaScript has also become very popular as a server side language.

-->

<--

What is AJAX?

--

It stands for Asynchronous JavaScript and XML. It's the technology used to download content from a server without requiring a full page reload. It can also be used to issue commands to a server without a page reload.

You may be familiar with HTML forms and how traditionally submitting a form would cause a full page reload.

-->

<--

What is a web service?

--

A web service is an endpoint (a URL essentially) that can be called to get data (without presentation information) from a server or to tell a server to perform a specific action. This works in conjunction with AJAX.

-->

# Dev Ops

The web has become increasingly demanding and complex. To meet these increasing demands Dev Ops has become increasingly important to stay competitive.

- Systems have become more decoupled and distributed.
- Micro services have become increasingly important.
- Automated testing is used to improve development time.
- Continuous integration and deployment allows for fast software updates.
