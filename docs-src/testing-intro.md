---
title: Testing Introduction
toc: 1
---

# Development Cycle

These are the steps taken to develop a piece of software:

1. Analysis
2. Design
3. Development
4. Testing
5. Integration
6. Maintenance

Steps 1 through 6 are repeated as the software evolves.

# Why Write Tests

## Code Velocity

- You're boss wants you to get your code done quickly.

- You want to get your code done quickly.

- Developers are often excited to see their code working and focus on self testing.

- Self testing is slow and exponentially gets slower.

## The Cost of Development

Some parts of software development are cheaper than others. Here is the estimated breakdown:

1. Analysis - 5%
2. Design - 5%
3. Development - 5%
4. Testing - 10%
5. Integration - 10%
6. Maintenance - 65%

## Why Write Tests

1. To increase code confidence.

2. It stops code constipation. A complex problem can be broken down into tests and then the code written to make the tests pass.

3. You don't have to wait for dependencies to run before validating code.

4. Allows you to change code quickly and know it still works.

5. It documents how to use your code.

6. So you know when you're done coding.

7. Proper testing reduces development time and **greatly** reduces the cost of maintenance.

# Types of Tests

- Unit testing

    - Test the units individual isolated functionality (testing functions).
    - Tests must not affect stateful information.
    - One test failing or succeeding must not affect other tests.
    - Very fast.
    
- Integration testing 

    - Tests the integration of units that interoperate with one another (testing databases, web APIs, etc).
    - Ensures that units are working together.
    - A bit slower.
    
- Acceptance (UI) testing and End to End testing

     - Test that the software behaves like the user expects (buttons, navigation, etc. all work).
     - Customer satisfaction tests. 
     - This takes the longest and if unit and integration tests have not been performed can make this a slow and discouraging process.

## Testing Styles

- Black box testing - we cannot observe inside the code, we can only provide tests and evaluate the responses. These tests are much less brittle, but if they have dependencies it can make it hard to get the test set up.

- White box testing - No barrier between inside code. Can inject dependencies, allowing us to provide fake dependencies. Down side is that it's more brittle.

Any test style can be used with any test type.

# Testing Concepts and Terminology

- There are many testing libraries (test runners).

- Some test runners execute synchronously, some asynchronously, and others a mix of both. It's important to know how the test runner will run because it affects how you can write your tests.

- Most test runners share many of the same features.

## Terminology

- **Testing Suites**

    - Made up of multiple tests.
    
    - Can have before and after hooks. This is code that is run before or after each test within the suite.
    
    - Can also have before all and after all hooks that are run before or after any tests in the test suite.

- **Assertions** assert that an expected behavior occurred. For example, if you call function A with inputs B and C then D is the expected output.

    - There are positive assertions: If you call function A with inputs B and C then D is the expected output.
    
    - There are negative assertions: If you call function A with inputs B and C then D should not be the output.
    
    - Most things being tested will need multiple positive and negative assertions.

- **Reporters** format the results of the test to be readable by people or applications.

# How to Write Tests

Exactly how you write a test will vary depending on the coding language, the type of test, etc., but all testing basically follows these concepts:

1. Write a test that fails

2. Write code to make the test pass

3. Repeat

## Important Tips

Testing will save you exponential amounts of time.

- Write tests early. If you wait too long you may produce code that is hard to test.

- If you find a bug, write a test that proves the bug's existence, then fix the code so that the test passes.

- If you already have a lot of code written, just start writing tests for any new code (or changes to code) that you write.
