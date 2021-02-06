---
title: Testing Vue Components
description: Because Vue components are reusable chunks of code the are the perfect candidate for testing.
---

It is easy to create a new project with the [Vue CLI](https://www.npmjs.com/package/@vue/cli) that has testing enabled. Run the command `vue create <app-dir>` and follow the prompts.

- Install the [Vue CLI](https://www.npmjs.com/package/@vue/cli): `npm install -g @vue/cli`
- Create a new app: `vue create <app-dir>`
- Follow the prompts and include testing.

## Unit Testing

If you choose to use unit tests in your app setup then you will have the [Vue Test Utils](https://vue-test-utils.vuejs.org/) library installed.

[Getting Started](https://vue-test-utils.vuejs.org/guides/#getting-started)

[API](https://vue-test-utils.vuejs.org/api/)

**Quick Tips**

- Become familiar with [`shallowMount`](https://vue-test-utils.vuejs.org/api/#shallowmount)
- Understand the [`wrapper`](https://vue-test-utils.vuejs.org/api/wrapper/#properties)

**Example**

Check out the github repo https://github.com/Gi60s/it410-resources and look inside the `vue/test-utils/tests/unit` directory.

Run the tests with: `npm run test:unit`

<question-answer q="What should we test in a component? What shouldn't we test?">

We should test the functionality that we gave to this component, but generally we wouldn't test much of the functionality of it's child components other than some integration tests.

</question-answer>

<question-answer q="So what are some things we need to test for the NumberPicker component?">

- Does setting the "value" attribute cause the value indicated to be set?
- If we omit the value does it have zero has the default?
- Does clicking the buttons work?
- Can we go beyond the max and min values?
- Does the slot work for changing the label?
- ... and so on

</question-answer>

## End to End Tests

The Vue CLI project creation has two options for e2e tests:

- Cyprus (a Chrome based test runner with a nice graphical UI)
- Nighthawk (a Selenium based test runner that tests multiple browsers)

**Example**

Check out the github repo https://github.com/Gi60s/it410-resources and look inside the `vue/test-utils/tests/e2e` directory.

Run the tests with: `npm run test:e2e`

- The Cyprus library borrows a lot from jQuery. It is similar to how jQuery works.
- The UI allows you to click on all of the steps of a test and see the UI at each step.
- Opening the Chrome dev tools and stepping through the test shows additional info in the console.
- Setting breakpoints wont work.
