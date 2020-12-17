---
title: Express
description: Foo
---

- A NodeJS package that uses the core [http module](https://nodejs.org/dist/latest/docs/api/http.html) to create a web server.
- From [expressjs.com](http://expressjs.com): Fast, unopinionated, minimalist web framework for Node.js
- It doesn't serve anything unless you tell it what and how to serve content.

**Exercise**

Open your final project and do the following:

1. Install the express package in your project: `npm install express`
2. Create file named: `server.js`.
2. Within that file start up an express server with a simple `get` route. [Check out the Hello World Example](http://expressjs.com/en/starter/hello-world.html).
3. Use a web browser to hit the route.

## HTTP Request

1. The method. The most common methods are `GET`, `POST`, `PUT`, and `DELETE`.
2. The URL
    ```
    http://someplace.com:3000/the/path?param1=foo&param2&param3=bar#hash
    ```
    - `http` - the protocol
    - `3000` - the port number. If the protocol is `http` then the default port is `80`. If the protocol is `https` then the default port is `443`.
    - `someplace.com` - the domain
    - `/the/path` - the path
    - `param1=foo&param2&param3=bar` - the query parameters, follow the `?`, each parameter is separated by `&` and can be assigned a value with `=`.
3. The headers
    - Formatted like ```Header-Name: header-value``` per header.
    - Includes cookies and other metadata (content types, user agent, etc).
    - Sometimes the server cares about the incoming headers and sometimes it doesn't.
4. The body: a payload of information. Most commonly sent as UTF-8 strings, sometimes sent as binary.

## HTTP Response

1. The status code: gives state information about the response. [Status Code Reference](http://www.restapitutorial.com/httpstatuscodes.html)
2. The body: a payload of information that can be of any format.
3. The headers:
    - Formatted the same as the request headers.
    - Contains cookies to set or clear and metadata.

## Implementing HTTP Methods

### Postman

Before we talk about these HTTP methods and play with them:

- It is easy to make a GET request because when you use a browser's URL input, that is a GET request.
- It is more difficult to use the other methods because you have to use JavaScript code or a tool of some sort.
- [Postman](https://www.getpostman.com/downloads/) is free tool that allows you to easily send requests using any HTTP method, URL, headers, and body.

### GET

- Probably the most commonly used method.
- Shouldn't be used to save data.
- Should not include a body.
- Should be idempotent.

<question-answer q="What does *idempotent* mean?">

No matter how many times to do an operation the result is the same. If you are unsure if an operation completed, trying it again doesn't cause any additional changes.

</question-answer>

**Exercise**

Use Postman or another REST Client to make a GET request to your only route so far (from the previous exercise).

### POST

- With a POST you can send information in the body of the request.
- Should not be idempotent - each time it's used it should make a change.
- Is not the CRUD equivalent of *create*, although it is often similar.

**Exercise**

1. In your `server.js` file create a POST endpoint to `/` (same as GET, but with POST).
2. Have the response body be "POST".
3. Restart your server.
4. Use Postman to hit your POST endpoint.

#### Send a Body

- Can be of any format.
- Is sent as binary stream.
- The server uses the `Content-Type` header in the request to determine the body format.
- The server needs a parser to parse the content.
- We can implement the body-parser that comes with express.

#### Middleware

- Middleware is function that looks like this:
    ```js
    function (req, res, next) {
      // do something
      next()
    }
    ```
- The parameters for that function are:
    - `req` - An object that represents the request object.
    - `res` - An object that represents the response API.
    - `next` - A function that can be called to execute the next middleware in line. Can also be called with an Error passed in as a parameter.
- Used in servers to 1) add or modify function on the request and response objects or 2) to fulfill the request.
- You implement the middleware using the `use` function.
    ```js
    const express = require('express');
    const app = express();

    // middleware that adds an id property to the request object
    app.use(function(req, res, next) {
        req.id = Math.random();
        next();
    });

    app.get('/', function (req, res) {
      res.send('Request ID: ' + req.id)
    });

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    });
    ```
- You probably won't create custom middleware so much as you'll use other people's created middleware.

**Exercise**

1. Use the [Express JSON body-parser](http://expressjs.com/en/4x/api.html#express.json) to capture the body of the POST request.
2. Send that content back with `res.send()`.
3. Use your REST Client to post a body to the POST endpoint.

### PUT

- With a PUT you can send information in the body of the request.
- Should be idempotent - no matter how many times you call it, the result is the same.
- Is not the CRUD equivalent of *update*. It can also be used to create. Example: Put the data to this state. If it doesn't exist then it creates it into that state.

### DELETE

- With a DELETE you should not send information with the body.
- Should be idempotent - no matter how many times you call it, the result is the same.
- If it is already deleted it shouldn't complain because the job is done.

## Static Middleware

- Express comes bundled with the static middleware: static
- The middleware is used for serving static files (files that are in the local file system) to the browser.
- [Express Static Documentation](http://expressjs.com/en/starter/static-files.html)

**Exercise**

1. Create a directory and put a file (or files) into it that you'll serve as static content. This can be an HTML file, a text file, an image, etc. 
2. Add to your server code that serves the files from that directory.

## Routing

- Express comes with built in routing for all of the HTTP methods we've seen so far.
- It also has an `all` routes function that gets called for any route.
- You can specify routes directly onto the server instance or through a routing middleware.

**Example: Routing via Server Instance**

```js
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('You used GET');
});

app.post('/', function(req, res) {
    res.send('You used POST');
});

app.put('/', function(req, res) {
    res.send('You used PUT');
});

app.delete('/', function(req, res) {
    res.send('You used DELETE');
});

app.all('/oneOf', function(req, res) {
    res.send('You used ' + req.method);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

### Path Parameters

- It is also possible to specify parameters in your routing.
- Any path parameters specified can be read from the `req.params` object.

```js
const express = require('express');
const app = express();

app.get('/foo/:myParam', function(req, res) {
    res.send('Path parameter: ' + req.params.myParam);
});

app.get('/bar/:optionalParam?', function(req, res) {
    res.send('Path parameter: ' + req.params.optionalParam);
});

app.get('/bar/:multiPath*', function(req, res) {
    res.send('Path parameter: ' + req.params.multiPath);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

You can also read query parameters (ex: `req.query.paramName`) and headers (ex: `req.headers['header-name']`).

### Express Router

You can create an express router instance that allows you define routes that are more modular.

- Better separation of routes.
- Within a module just define the sub-routes.
- Define in a parent module the base route.

**my-router.js**

```
const Router = require('express').Router;
const router = new Router();

module.exports = router;

router.get('/subPath', (req, res) => {
    res.send('You reached the subpath.');
});
```

**server.js**

```js
const express = require('express');
const myRouter = require('my-router');

const app = express();

app.use('/base/path', myRouter);

app.listen(3000);
```

Hitting the URL `http://localhost:3000/base/path/subPath` will return `"Your reached the subpath"`.

## Template Engines

A template engine allows you to write HTML pages that are dynamically built on the server with each request, similar to PHP.

Express allows for [multiple template engines](https://expressjs.com/en/resources/template-engines.html)

[Template engine guide](https://expressjs.com/en/guide/using-template-engines.html)

## Express API Server

Express can serve static files, act as a server side render engine (using templates), and act as a REST server.

Because we already have an OpenAPI document we can now use the [OpenAPI Enforcer](https://www.npmjs.com/package/openapi-enforcer) and the [OpenAPI Enforcer Middleware](https://www.npmjs.com/package/openapi-enforcer-middleware) to convert our OpenAPI document into a working API.

Use the [OpenAPI Enforcer Middleware Getting Started Guide](https://byu-oit.github.io/openapi-enforcer-middleware/getting-started) to get started.

**Exercise**

Implement the [OpenAPI Enforcer Middleware](https://www.npmjs.com/package/openapi-enforcer-middleware) for your Express server.
