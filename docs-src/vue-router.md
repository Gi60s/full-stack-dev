---
title: Vue Router
toc: 1
---

The Vue Router is a simple library that allows you to tie routes (web URLs) to views (pages). This is the default tool for turning a multi-page web application into a single page app. 

(Remember that Vue is modular and does not restrict you to use this specific router.)

[Vue Router documentation](https://router.vuejs.org/)

## Exercise

### Create Views

We'll start by creating several views. Initially these pages will be very basic, containing just an `<h1>` tag with a unique title.

1. Create these views (pages)

    - Home
    - Login
    - Profile
    - Contacts

2. Create a common navigation bar for all pages by adding it to `App.vue`

### Create Login Page

On the login page we'll allow credentials to be entered but we'll store the information in the global window space for now until we learn about Vuex.

1. Create login page with username and password fields.

2. Clicking login will verify that the fields are not empty, then store the username and password to `window.user = ...`

### Protect Routes

Some routes should not be accessible without being logged in.

1. Only show certain nav links based on logged in status

2. Use route meta and **beforeEach** navigation guards to restrict Profile and Contacts views to logged in users.

    - Automatically redirect to login
    - Store route to return to after login

### Other Routing Topics of Interest

- [HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

- [Route path parameters](https://router.vuejs.org/guide/essentials/dynamic-matching.html)

- [Router guard middleware lifecycle](https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow)

- [Programmatic Routing](https://router.vuejs.org/guide/essentials/navigation.html) with router `push`, `replace`, and `go`
