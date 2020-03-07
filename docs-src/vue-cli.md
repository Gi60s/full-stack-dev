---
title: Vue CLI
toc: 1
---

# Build Tools

Previously we created a simple Vue app that does not require build tools.

<--

What are build tools?

--

Build tools perform tasks that are mundane, repetitive, and sometimes complex.

-->

<--

Most big JavaScript libraries have a file with `.min` in its name. For example, jQuery has `jquery-3.3.1.js` and `jquery-3.3.1.min.js`. What is the difference and why?

--

The `.min` file is a minified version of the original JavaScript file.
 
- White space is reduced, variable names are shortened, etc.
 
- The minified file is almost impossible to read

- The minified file loads faster because of its smaller file size

- The browser executes both files just

[jQuery 3.3.1 Minified](https://code.jquery.com/jquery-3.3.1.min.js) (30 KB)

[jQuery 3.3.1 Normal](https://code.jquery.com/jquery-3.3.1.js) (78.9 KB)

A build tool can convert your regular JavaScript file into a minified JavaScript file

-->

## Common Build Tool Processes

- Minifying JavaScript

- Obfuscating JavaScript

- Pre-processing for CSS

- Converting TypeScript to JavaScript

[A Good Article About JavaScript Build Tools](https://hackernoon.com/javascript-build-tools-and-automation-systems-9589c5c91ebe)

# Vue CLI

The [Vue CLI](https://cli.vuejs.org/guide/) consists of:

- The CLI, a command line interface tool that makes it easy to set up and manage Vue applications.

- The CLI Service that makes it easy to run your app, build it, and test it.

- CLI Plugins for extending the functionality of your build processes

## Creating an App

This is how you create a front-end application. This type of application would communicate with your server via AJAX requests.

1. Install the Vue CLI: `npm install -g @vue/cli`

2. Create a project: `vue ui` (or alternatively `vue create <your-app-name>`)
    
3. After initializing a project, checkout the plugins, dependencies, and configuration.

4. Install the Vue Router and Vuex plugins.

5. Look at tasks, start the server, etc


