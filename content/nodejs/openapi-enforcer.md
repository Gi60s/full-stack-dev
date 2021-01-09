---
title: OpenAPI Enforcer
description: Simplify your API development work by using the OpenAPI Enforcer to perform validations and serializations.
---

The [OpenAPI Enforcer](https://byu-oit.github.io/openapi-enforcer/) and [OpenAPI Enforcer middleware](https://byu-oit.github.io/openapi-enforcer-middleware/) greatly simplify the process of building a REST API. It does this by:

- Validating your OpenAPI specification document.
- Validating and deserializing incoming requests.
- Validating and serializing responses.
- Building routes for your Express app.
- Provides an interface for mocking responses.
- Ensures that your API does what your OpenAPI document says it will.

<question-answer q="What is serialization?">

Serialization (the act of serializing) is taking a non-text value and converting it into a text equivalent that can later be deserialized.

For example, to convert a JavaScript object to a string you using `JSON.stringify()` and to convert a JSON string to an object you use `JSON.parse()`.

</question-answer>

<question-answer q="What is mocking?">

Mocking is when you create a response that is representative of the structure of a real response although not necessarily the data.

For example, if you had a person object with a name and age then you could pull that data from a database to get real data, or if you were mocking the data you'd make it up, giving a value that had the same structure:

```js
{
  name: 'Bob',
  age: 25
}
```

</question-answer>

To get started, check out the [OpenAPI Enforcer middleware getting started guide](https://byu-oit.github.io/openapi-enforcer-middleware/2.x/getting-started).