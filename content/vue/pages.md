---
title: Vue Pages
description: The Vue router allows you to create a single page app that appears to exist across multiple pages.
---

## Single Page App

A single page app is a web application that:

- Loads the base JavaScript, HTML, and CSS when the user visits the page.
- When the user navigates to another "page" in the app:
    - It loads some additional JavaScript, HTML, and CSS but is able to use the already downloaded JavaScript, HTML, and CSS from before.
    - It is really just changing the view (what is displayed), not actually loading a new page.
    - Updates the URL to reflect the new page location.
- Loading any of the possible "pages" (known as routes) by refresh or navigating from another webpage will load the base JavaScript, HTML, and CSS.

### index.html

The `index.html` page is considered the home page for any website. (There are some variations based on your technology, for example `index.php` or `index.asp`.)

When a user visits your website at `http://my-app.com` the server identifies that the client is requesting the index (or home) page.

With single page applications you have one `index.html` page. The different pages (or views) that you'll see are all loaded on the foundation that is the `index.html` page along with it's associated JavaScript, HTML, and CSS.

## The Vue Router

The Vue Router is a simple library that allows you to tie routes (web URLs) to views (pages). This is the default tool in Vue for turning a multi-page web application into a single page app. 

(Remember that Vue is modular and does not restrict you to use this specific router.)

[Vue Router documentation](https://router.vuejs.org/)

### Nuxt Pages

Because we are using Nuxt to build our app, Nuxt has already built the scaffolding to define our routes.

With Vue alone you'd need to define your routes something like this example taken from https://router.vuejs.org/guide/#javascript.

```js
// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')
```

With Nuxt you simply need to define Vue components in the pages directory and the file system structure will be used to set up the routing. You can read about this at https://nuxtjs.org/docs/2.x/features/file-system-routing.

Also important:

- You can create both static and dynamic routes as documented at https://nuxtjs.org/docs/2.x/features/file-system-routing.
- [Layouts](https://nuxtjs.org/docs/2.x/directory-structure/layouts) are used to define the HTML, CSS, and JavaScript that goes around your pages.
- HTML navigation between your views can be accomplished using the [NuxtLink](https://nuxtjs.org/docs/2.x/features/nuxt-components#the-nuxtlink-component) tag.
- JavaScript navigation within your Vue components uses `this.$router`. https://router.vuejs.org/api/#router-instance-methods
- You can see the current route information by using `this.$route` within your component.

### Protect Routes

Some routes should not be accessible without being logged in.

To protect navigation routes we use route guards.

- Route guards are not a security measure. Anything on the client can be overwritten by a developer with console knowledge.
- Some route guards are [global guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards).
- Some route guards are [route specific guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard).
- Some route guards are [component specific guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards).

### HTML5 History

The browser is able to update the URL using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) that was introduced with HTML5.

There are two methods for updating the history without actually navigating away from your single page app. One uses the hash (`#`) in the URL and one does not.

<question-answer q="What does the hash typically do in the URL?">

In a standard web page you can create named anchors. Often these named anchors are created around section headers.

Think of Wikipedia as an example. There are generally multiple sections on each page and a table of contents near the top of each page. Named anchors are added to the top of each section and the table of content has links to the respective named anchors.

When the URL updates with a hash, it tells the browser to scroll the page to the location of that named anchor.

</question-answer>

#### Hash Routing

If your single page app uses the hash to update the URL then this is what happens:

1. You load the page for the first time and it gets all the JavaScript, HTML, and CSS needed for the base app.
2. The app initializes and looks at the URL and identifies the hash. The hash tells the app which view to load.
3. The browser loads additional JavaScript, HTML, and CSS to display that view.
4. If the route changes, the URL after the hash changes, and we go back to step 2 (in this list) to know what now also needs to load.

#### HTML5 Routing

This routing does not use hashes and makes the URL look more natural. For example: `http://my-app.com/tasks/123/edit`.

<question-answer q="If directing your browser to http://my-app.com/ loads the index.html of your application, then what would http://my-app.com/tasks/123/edit typically load from the server?">

Working here...

</question-answer>


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