---
title: Sessions
description: Sessions are used to identify returning users.
---

## Cookies

<block-quote attribution="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">

An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with the next request to the same server. Typically, it's used to tell if two requests came from the same browser — keeping a user logged-in, for example. It remembers stateful information for the stateless HTTP protocol.

</block-quote>

1. Server tells the browser to save some *small* data.
2. Browser automatically sends that cookie back to the server with each request.

Often used for:

- Session management
- Personalization
- Tracking

### Cookie Options

- Expiration date - how long should the browser keep the cookie. Follow up visits to the server may renew the cookie.
- Domain and path - tells the browser which requests being sent to the server should include the cookie.
- [Express Cookie Settings](https://expressjs.com/en/4x/api.html#res.cookie)

## Sessions

Sessions allow you to store data about the current user on the server. This is done by:

- Using a cookie to create an identifier stored on the browser.
- Storing into the database information about the user.

Sessions have the advantage of storing as much information as you'd like, but the disadvantage of requiring a database to store that data. 

## Passport and Express

<block-quote attribution="http://passportjs.org/">

Passport is authentication *middleware* for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.

</block-quote>

- It reduces the amount of work you need to do for authentication.
- It has the ability to do local authentication.
- It has OAuth capabilities (use Facebook, Google, or other services to log in).
- It is modular, you need to include the components that you are interested in.

[Passport Documentation](http://passportjs.org/docs)

### Strategies

Using passport you'll hear about strategies. A strategy:

- Is a module that integrates with Passport.
- Handles a specific type of authentication (local, OAuth, etc).
- Must be installed (via npm) independently of the Passport module.
- Has its own documentation with instructions for usage.

### Starter Code Example

```js
// include modules
const cookieParser      = require('cookie-parser');
const express           = require('express');
const LocalStrategy     = require('passport-local').Strategy;
const passport          = require('passport');
const session           = require('express-session');

// initialize express app
const app = express();

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
    if (username && password === 'pass') return done(null, { username: username });
    return done(null, false);
}));

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
    done(null, { username: id });
});

// tell the express app what middleware to use
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// home page
app.get('/', function (req, res) {
    if (req.user) return res.send('Hello, ' + req.user.username);
    res.send('Hello, Stranger!');
});

// specify a URL that only authenticated users can hit
app.get('/protected',
    function(req, res) {
        if (!req.user) return res.sendStatus(401);
        res.send('You have access.');
    }
);

// specify the login url
app.put('/auth/login',
    passport.authenticate('local'),
    function(req, res) {
        res.send('You are authenticated, ' + req.user.username);
    });

// log the user out
app.put('/auth/logout', function(req, res) {
    req.logout();
    res.send('You have logged out.');
});

// start the server listening
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
```

### Code Break Down

This part of the code should look pretty familiar. We include the modules we plan to use and start up the express web server.

```js
// include modules
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const express           = require('express');
const LocalStrategy     = require('passport-local').Strategy;
const passport          = require('passport');
const session           = require('express-session');

// initialize express app
const app = express();

...

// start the server listening
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
```

Here we tell express what middleware to use:

- The body-parser will extract body information from the request and store it at req.body for each request.
- The cookie-parser will determine what cookies the client has on it and store it at req.cookie.
- The express-session works with cookies to create and maintain session information.
- The passport.initialize() is required to initialize passport.
- The passport.session() must be added at some point **after** express-session middleware. It augments express-sessions by adding authentication information to the session.

```js
...

// tell the express app what middleware to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

...
```

This code tells passport of an authentication strategy that we will use.

- It is possible to have more than one strategy.
- The local strategy expects two parameters to be sent with the request, *username* and *password*.
- It is possible to change the names of those parameters through the local strategy configuration.
- The done function must be called after you are done checking the username and password.
    - If there was an error then the first parameter of `done` will be that error.
    - If there is no error then the first parameters should be null and the second can be the user object or false on failed authentication.

```js
...

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
    if (username && password === 'pass') return done(null, { username: username });
    return done(null, false);
}));

...
```

- With session management, when a user authenticates, the user object from `done` can be serialized into a string.
- The deserialize function is used to turn the string back into the user object. This function is called when a request is made and the user is already authenticated.


```js
...

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
    done(null, { username: id });
});

...
```

Here we set up routes. If the req parameter has a `user` property then the user is authenticated.

```js
...

// home page
app.get('/', function (req, res) {
    if (req.user) return res.send('Hello, ' + req.user.username);
    res.send('Hello, Stranger!');
});

// specify a URL that only authenticated users can hit
app.get('/protected',
    function(req, res) {
        if (!req.user) return res.sendStatus(401);
        res.send('You have access.');
    }
);

// specify the login url
app.put('/auth',
    passport.authenticate('local'),
    function(req, res) {
        res.send('You are authenticated, ' + req.user.username);
    });

// log the user out
app.delete('/auth', function(req, res) {
    req.logout();
    res.send('You have logged out.');
});

...
```

### Deeper Understanding

To better understand how these components work together:

- Clone the git repository at https://github.com/Gi60s/it410-resources
- Open in your IDE the `it410-resources/sessions/index.js`
- Do an `npm install` on the directory
- Run this `index.js` code in debug mode.
- Set up breakpoints for the different route callbacks as well as on the LocalStrategy and the serialize/deserialize methods.
- Make GET, PUT, and DELETE requests (using Postman) to the various endpoints.

### Storing Sessions in the Database

Usually you want to tie your session to your database. This is critical if your server is load balanced or needs restarting without killing existing sessions.

- [express-mongo-session](https://www.npmjs.com/package/express-mongo-session)
- [express-mysql-session](https://www.npmjs.com/package/express-mysql-session)
- [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple)

## JWT

A JWT is an encoded and signed set of data about the client who is accessing the service.

<block-quote attribution="https://en.wikipedia.org/wiki/JSON_Web_Token">

JSON Web Token (JWT, sometimes pronounced /dʒɒt/, the same as the English word "jot”) is an Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key.

</block-quote>

<question-answer q="How does signing with a private secret work?">

A value is encoded (not encrypted) using a private secret (a password that only the sender knows). Depending on how the encoding worked the client may be able to read the sent value.

The client can then send the encoded value back to the server that can both decode and verify the token. If the token has been modified then the signature will not match.

</question-answer>

### Claims

The payload of your JWT contains claims. These are assertions of values that are true regarding the subject (the user).

**Common Claims**

- `iss` - The issuer of the JWT
- `sub` - The subject / user
- `exp` - When the JWT expires
- `iat` - When the JWT was issued

**Custom Claims**

You can really save any key value pairs.

### JWT.io

The website https://jwt.io/ is a nice resource for playing around with JWTs. You can see how by adding claims to the payload the encoded token changes.

### Using JWTs with NodeJS

To use JWT's you need to have a way to create a JWT and a way to verify a JWT.

The NPM package [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) provides signing and verifying methods.

**Example**

```js
const jwt = require('jsonwebtoken')
const secret = 'my secret key'

// sign and encode
const token = jwt.sign({
  sub: 'Your User Name',
  admin: false
}, secret)

// verify and decode
const decoded = await jwt.verify(token, secret)
```

### Additional Reading

- https://en.wikipedia.org/wiki/JSON_Web_Token
- https://auth0.com/docs/tokens/json-web-tokens
