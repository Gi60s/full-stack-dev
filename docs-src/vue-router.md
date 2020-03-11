---
title: Vue Router
toc: 1
---

The Vue Router is a simple library that allows you to tie routes (web URLs) to views (pages). This is the default tool for turning a multi-page web application into a single page app. 

(Remember that Vue is modular and does not restrict you to use this specific router.)

[Vue Router documentation](https://router.vuejs.org/)

# Configuration

- The Vue Router configuration is stored by default in `src/router/index.js`. This stores the actual routes and the Components that they are associated with.

- The main JavaScript file (`src/main.js` ) attaches the Vue Router to the root component.

# Exercise

The remainder of this lesson is a series of exercises that build one upon another. Introductions proceed each exercise.

## Create Views

We'll start by creating several views. Initially these pages will be very basic, containing just an `<h1>` tag with a unique title.

1. Create these views (pages) in the `src/views` directory. Each view is a Vue component.

    - Home
    - Login
    - Profile
    - Contacts

2. Create a common navigation bar for all pages by adding it to `App.vue`

## Create Login Page

On the login page we'll allow credentials to be entered but we'll store the information in the root component. This is OK for small apps but a state management engine is preferred for larger apps.

1. Add a form to the login page with username and password fields and a submit button.

2. Clicking the login button will store the username field's data as the logged in user, using a method within that view that runs `this.$root.$data.user = this.username`

## Protect Routes

Some routes should not be accessible without being logged in.

To protect navigation routes we use route guards.

- Route guards are not a security measure. Anything on the client can be overwritten by a developer with console knowledge.

- Some route guards are [global guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards).

- Some route guards are [route specific guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard).

- Some route guards are [component specific guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards).

Set up a route specific guards on the `profile` and `contacts` pages.

- Trying to visit the `profile` or `contacts` pages without being logged in should redirect to the login page.

- After login the user should redirect to the page they just came from.

## Create a Dynamic Route

- [Dynamic routes](https://router.vuejs.org/guide/essentials/dynamic-matching.html) allow you to define routes with path parameters. Example: `/greet/:name`

- Dynamic routes can have multiple path parameters.

- Views can access the route path parameters using `this.$route.params.<path_param_name>` or `$route.params.<path_param_name>` if evaluated in the component' HTML.

Use this information to:

1. Create a view called `Greet.vue`.

2. Define a dynamic route that loads `Greet.vue` with this path: `/greet/:name`

3. The `Greet.vue` file should display `"Hello, <name>"` with the name entered into the path.

## Create a 404 Route

A 404 route is a page that users see if the URL they have specified does not match any routes.

1. Create a `NotFound.vue` file that says something about the page not existing.

2. Add a [route that catches all other paths](https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route) and shows the `NotFound.vue` file.

# Server Setup

Your server needs to be built to allow HTML 5 history mode routing.

<--

Why can't the following server handle HTML 5 history mode routing?

```js
const express = require('express')
const path = require('path')

const app = express()
const wwwFolder = path.resolve(__dirname, '../www')

app.get('*', express.static(wwwFolder))

app.listen(3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Server listening on port 3000')
  }
})
```

--

There are a few important things to understand:

- As you navigate in the browser and the URL updates, you are not actually visiting that route on the server.

- If you request one of those sub routes on the server it won't find that folder in it's directory structure.

- If the browser requests an HTML page that doesn't exist then the server should send back the main `index.html` page.

- When the browser loads the `index.html` page it will initialize the app and display the appropriate view for whatever the URL says.

-->

Check out the [Vue HTML 5 Guide for NodeJS](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) for help on setting this up on your own server.

# Some Other Routing Topics

- [HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

- [Router guard middleware lifecycle](https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow)

- [Programmatic Routing](https://router.vuejs.org/guide/essentials/navigation.html) with router `push`, `replace`, and `go`
