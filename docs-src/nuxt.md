---
title: Nuxt
toc: 1
---

# Isomorphic Web Apps

An isomorphic web application's code can run the on the server and on the browser.

- Possible with NodeJS and web browser JavaScript because they are both JavaScript.

- Code needs to be written to run in both environments. 

    For example, NodeJS does not have an `alert` function and the browser does not have access to the file system.
    
## How does this work?

### Initial Page Load

1. The web browser makes a request to the server to load the home page.

2. The server finds the home page and evaluates it on the server, loading the JavaScript files and running them.

3. Some JavaScript files make AJAX requests, so those will also be made server side.

4. Once all JavaScript has run, the server will send to the browser the complete page with AJAX requests completed and page manipulations completed.

### On the Browser

1. The home page loads already fully rendered (CSS might still load).

2. The user interacts with the web application and...

    - AJAX requests might be made
    
    - Additional HTML, JavaScript, etc. might be downloaded and run
    
    - JavaScript may manipulate the current view
    
3. The browser will use the app now as if it were all a client side app.

# Nuxt

[Nuxt](https://nuxtjs.org/)...

- Leverages Vue's built in server side render (SSR) technology.

- Standardizes:

    - Routing
    
    - Views
    
    - State management
    
    - Plugins
    
    - Middleware
    
    - etc.

## Personal note:

This is awesome tech and I highly recommend it for the benefits it provides:

- Improved search engine optimization (SEO) for your site

- Much faster initial page loads

- Standardization
    
On the down side, it does require a paradigm shift that is not trivial:

- Your view works, "Yay", except does it work when being rendered by the browser AND the server? 

- You need to know how to solve a problem the browser way and the server way.

## Getting Started

1. [Installation](https://nuxtjs.org/guide/installation)

2. [Directories](https://nuxtjs.org/guide/directory-structure)

3. [Routing](https://nuxtjs.org/guide/routing)

    - By default it uses the folder and file structure.
    
    - It can support dynamic routes too.

4. [Views](https://nuxtjs.org/guide/views)

    - Built from the app template, layouts, and pages
    
    - The app template is the HTML, CSS, and JavaScript that gets put on every page.
    
    - Layouts define reusable page layouts.
    
    - Pages define which layout to use and what the content is.

5. [Async Data](https://nuxtjs.org/guide/async-data)

6. [Vuex](https://nuxtjs.org/guide/vuex-store)
