---
title: Testing NodeJS
toc: 1
---

# Mocha

- Homepage: https://mochajs.org/

- Install for your project: `npm install --save-dev mocha`.

- A test runner.

- Allow you to choose your assertion library and your reporter.

- High flexibility, lots of plugins.

<--

What is a test runner?

--

It is a library that will run your tests and test suites.

-->

<--

What is a test suite?

--

A collection or grouping of tests.

-->

## Mocha Test Suites

Mocha uses the `describe` function to define a test suite.

```js
describe('some group of tests', () => {
    // tests go in here
});
```

## Mocha Test Hooks

You can also specify before, after, before all, and after all test hooks:

```js
describe('some group of tests', () => {

    before(() => {
        // do something before all tests in this group - initial setup
    });

    after(() => {
        // do something after all tests in this group - final clean up
    });

    beforeEach(() => {
        // do something before each test in this group - reset the environment
    });

    afterEach(() => {
        // do something after each tests in this group - clean up
    });

});
```

## Mocha Nested Test Suites

You can also create test suites within test suites:

```js
describe('some group of tests', () => {

    // tests go in here

    describe('a sub group of tests', () => {
        // tests go in here
    });

});
```

## Mocha Tests

And of course you can add tests to the test suites using the `it` function.

```js
describe('some group of tests', () => {

    it('test that x happens', () => {
        // put assertion here
    });

});
```

## Mocha Asynchronous Tests

- Each test can use the callback paradigm or the promise paradigm.

- To use the callback paradigm add the `done` parameter to a test.

- To use the promise paradigm return a promise.

```js
describe('some group of tests', () => {

    it('callback', done => {
        // run assertions
        done();     // or done(err) to send an error
    });

    it('promise', () => {
        return foo()
            .then(value => {
                // run assertions
            });
    });

    it('async promise', async () => {
        const value = await foo();
        // run assertions
    });

});
```

## Running Tests

1. Add a test script to your package.json file. It should execute the command `mocha <dir>` where `<dir>` is the directory containing your tests.

    ```json
    {
        "scripts": {
            "test": "mocha test"
        }
    }
    ```

2. Run the command `npm test`.

# Chai

- Homepage: http://chaijs.com/

- A test assertion library.

- Can be used with mocha but does not need to be used with mocha.

- It uses [language chains](http://chaijs.com/api/bdd/) to make tests human readable.

- Install for your project: `npm install --save-dev chai`.

```js
const expect = require('chai').expect;      // use BDD assertions
const users = require('../bin/users');      // the library we're testing

describe('user', () => {

    beforeEach(() => {
        users.deleteAll();
    });

    it('has no users', () => {
        const actual = users.getAll().length;
        expect(actual).to.equal(0);
    });

    it('can add a new user', () => {
        const obj = { user: 'Bob', age: 5 };
        users.add(obj);

        const actual = users.get('Bob');
        expect(actual).to.deep.equal(obj);
    });

});
```

# FizzBuzz

Given a positive number:

- If divisible by 3, returns "Fizz"

- If divisible by 5, returns "Buzz"

- If divisible by 3 and 5, returns "FizzBuzz"

- Otherwise return the number passed in.

## Exercise

Between each of these steps we'll want to run the tests. The simplest way to do this is with `mocha --watch test`.

Create an npm run script:

```json
{
    "scripts": {
        "test": "mocha test",
        "test:watch": "mocha --watch test"
    }
}
```

Start the script: `npm run test:watch`

1. Create a test that calls the FizzBuzz function with a `1` and verify that it returns a `1`. This test will fail because we have not implemented the function yet.

2. Create the FizzBuzz function that returns `1`. The test passes, but is poorly architected.

3. Create a test that passes in `2` and verifies the response is `2`. This will fail.

4. Reprogram the FizzBuzz function to return the number that was passed in. Both tests now pass.

5. Create a test that passes in `3` and verifies the response is `"Fizz"`. This will fail.

6. Fix the FizzBuzz function to return `"Fizz"` if the value is divisible by `3`. All tests should now pass.

7. Continue adding tests for each scenario and continue working on the FizzBuzz function until everything passes.

8. Clean up / refactor FizzBuzz function code. All tests should still pass.

# Quality Test Code

- Write readable and maintainable test code.

- Address both positive and negative test cases. Don't stick to the happy path.

- Use test hooks for set up and tear down.

- If you find a bug, write a test that causes the bug to repeat and fail the test, then fix the bug to make the test pass.

- Execution order of tests should not matter. One test should not depend on the success of a previous test.
