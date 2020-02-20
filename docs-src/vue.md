---
title: Vue Introduction
toc: 1
---

# What is Vue

> Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.
> 
> https://vuejs.org/v2/guide/

- Vue makes it easier to manipulate the DOM than traditional JavaScript

- It is a relatively small library (much smaller than React and Angular)

- It's fast (as fast as React, faster than Angular)

- It's modular - pick and choose your tech

- Primary maintainer is Evan You

[Compare Vue to other frameworks](https://vuejs.org/v2/guide/comparison.html)

# Getting Started

There are several ways to get started with Vue. We'll start with one that is similar to what you are already familiar with.

**index.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Title</title>
  <link type="text/css" rel="stylesheet" href="css/main.css">
</head>
<body>
  <div id="app">
    <p>{{message}}</p>
  </div>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script type="text/javascript" src="app.js"></script>
</body>
</html>
```

**app.js**

```js
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello, World!'
  }
})
```

## Useful Links

- [Vue Guide](https://vuejs.org/v2/guide/)
- [Vue API](https://vuejs.org/v2/api/)

# Exercise

- We'll be using [VS Code](https://code.visualstudio.com/) to run shared programming.

- Install the [VS Live Share Extension Pack](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack).

- Within Chrome we'll want to install the [Vue Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) to help us with debugging and development of our Vue apps.

## Business Card

- Inputs to specify the name, phone, email, and address to use on the business card. (v-model)

- Input to specify print quantity. (v-model)

- A selection of colors to choose from for the text color. (v-for, @click)

- A selection of colors to choose from for the background color. (v-for, @click)

- Business card preview live updates as we make changes.

- Live updates on price, based on how much text and quantity (computed value)

- A checkbox to click if you are a VIP member that when checked will show a form to input your VIP number 
