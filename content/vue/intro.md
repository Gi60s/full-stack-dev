---
title: Vue
description: A client side framework for dynamic web applications.
---

## What is Vue

<block-quote attribution="https://vuejs.org/v2/guide/">

Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

</block-quote>

- Vue makes it easier to manipulate the DOM than traditional JavaScript
- It is a relatively small library (much smaller than React and Angular)
- It's fast (as fast as React, faster than Angular)
- It's modular - pick and choose your tech
- Primary maintainer is Evan You

[Compare Vue to other frameworks](https://vuejs.org/v2/guide/comparison.html)

## Getting Started

There are several ways to get started with Vue. You'll remember that we already [created a Nuxt app](/vue/nuxt-intro) that includes Vue and we'll use that to get started.

<el-alert type="warning">

Vue just recently released version 3.0. Depending on how fast Nuxt comes up to speed we may be using version 2.x or 3.x of Vue.

</el-alert>

Vue Homepage: https://vuejs.org/

Be sure to check out both the Guide and the API. The guide is the perfect place to get started and learn the fundamentals. The API is where you go to learn the details about a particular functionality.

1. Use your IDE to open your Nuxt app.
2. Open the `/pages/index.vue` page.
3. Start/join the live coding session.
3. Build a business card:
    - Inputs to specify the name, phone, email, and address to use on the business card. (v-model)
    - Input to specify print quantity. (v-model)
    - A selection of colors to choose from for the text color. (v-for, @click)
    - A selection of colors to choose from for the background color. (v-for, @click)
    - Business card preview live updates as we make changes.
    - Live updates on price, based on how much text and quantity (computed value)
    - A checkbox to click if you are a VIP member that when checked will show a field to input your VIP number