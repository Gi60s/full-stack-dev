---
title: Nuxt Introduction
description: Learn how Nuxt and Vue are related and how they work together.
---

## What is NuxtJS

NuxtJS is a standardization tool that is built off of VueJS. The official [NuxtJS Website](https://nuxtjs.org/) will explain this in better detail, but here is a summary of what Nuxt standardizes for us.

1. Routing and navigation
2. Directory structure
3. Build process

These three items may not seem like much, but in reality they can greatly simplify the process of building a web application.

## Getting Started

For the latest, see https://nuxtjs.org/docs/2.x/get-started/installation.

1. Open a terminal and navigate to the parent directory for your project.
2. Run `npm init nuxt-app <project-name>`
3. Answer the prompts (information on those below).
4. Wait for installation to complete.

### NuxtJS Prompts

There are several questions that the Nuxt initialization will ask you. Here are a few of those and what they do.

**Yarn or Npm**

- NPM is the Node Package Manager that comes bundled with node.
- Both do essentially the same thing but in slightly different ways.
- Yarn was developed to address deficiencies in NPM, but it's development lead to great improvements in NPM so that they are both highly competive.

**UI Frameworks**

These are Vue libraries that add some nice UI components. Selecting one here will reduce installing and setup work. You can look each of these up using Google.

Vuetify is probably the most popular and uses a material design and has great accessiblity support.

In my opinion Element UI is nice looking.

**Nuxt.js Modules**

- Axios will let you use the axios library to make AJAX calls. If you don't use this, Nuxt has a built in ajax library that is accessible with the `$http` property.
- Progressive Web App refers to applications that act more like native applications. This provides system notifications, gps, etc.
- Content is used for creating a static content website from Markdown docs.

**Linting Tools**

These are used to help you have consistent formatting with your code. For professional projects I highly recommend them. For learning I recommend avoiding them because it will further complicate what you need to do for your builds.

**Testing Tools**

These are tools for testing your font-end browser code.

**Rendering Mode**

- Universal (SSR / SSG) is a mode that serves your static files and API endpoints from a single server. It also allows for first page renders to happen server side and additions to happen client side. Overall this simplifies development but it requires more expensive server hardware to run.

- Single Page App is a mode where all rending happens on the browser. This makes for less expensive servers but it does add complexity when making calls to your API.

## A REST API with NuxtJs

Most of what Nuxt brings is for front-end browser development, but it also has an option for running a server so that you can create a REST API. For details, see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware/#custom-api-endpoint.

1. Create an `/api` directory at the root of your Nuxt app.
2. Create the file `/api/index.ts` with this content:
  ```ts
  import express from 'express'
  import path from 'path'

  // Create express instance
  const app = express()

  // Create a simple logging middleware
  app.use((req, res, next) => {
    console.log(req.method.toUpperCase() + ' ' + req.path)
    next()
  })

  // Require API routes
  const users = require('./routes/users')

  // Import API Routes
  app.use(users)

  // Export express app
  module.exports = app

  // Start standalone server if directly running
  if (require.main === module) {
    const port = process.env.PORT || 3001
    app.listen(port, () => {
      console.log(`API server listening on port ${port}`)
    })
  }
  ```
3. Open the `nuxt.config.js` file and add this section:
  ```js
  {
    serverMiddleware: [
      { path: '/api', handler: '~/api' }
    ]
  }
  ```