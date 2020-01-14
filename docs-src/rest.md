---
title: REST 
toc: 1
---

# Web Services

A web service is a service that is available to clients to use via the web through an API.

<--

What is a client?

--

A client is generally an application on a computer that is accessing services from another application. The services that the client accesses may be on another computer across the network.

-->

<--

What is an API?

--

API stands for application programmable interface. An API provides inputs and outputs for a set of functionality whose implementation details are kept from the client.

-->

<!--

Thinking of past programming experiences, are functions (a.k.a. methods) technically considered APIs themselves? Why?

--

A function is an API. That API may not be accessible outside of the application, but internally it is used by the application. Inputs are provided and outputs are returned. What happens inside that function is hidden from the code that called the function. A function may be the simplest form of an API.

-->

# REST

REST is a standard for consuming web services.

- Stands for Representational State Transfer

- Used for sending data bidirectionally between a client and a server.

- Commonly a client browser uses AJAX to make requests to the server.

<--

A browser can act as a client, using AJAX to make API requests to a server. It is also possible for one server to make API requests to another server. Why would this be helpful?

--

Servers use API's a lot. One server may use an API to access a database (although database connections do not use REST). A server may also not have all the information it needs to fulfill a request but it knows where to find it, so it can make requests to another server's API for the data.

-->

<--

How do you know how to use an API? For example, in the case of a function, how do you know what inputs are required, what the function does, and what the expected results or failure conditions are?

--

It needs to be documented, or alternatively you can dig into the code to see how it works.

-->

# Open API Specification

## Some History

There had been several attempts to document REST APIs in the past. Most notably:

- 2009 Sun Microsystems presented Web Application Description Language (WADL).

- 2011 Tony Ham improved on the idea of WADL with [Swagger](https://swagger.io/).

- 2016 The Swagger specification was renamed to the OpenAPI specification and it's work now falls under the Linux Foundation.

## Swagger vs OpenAPI

OpenAPI is the specification.

Swagger is a set of official tools.

The [Swagger website](https://swagger.io/) still hosts a copy of the OpenAPI specification.

## What is it?

- A specification for helping you to document and define your REST API.

- Helps you to plan and organize your REST API.

- Documents your REST API for other's to consume.

- Has tools that enforce your API.

## Some Open API Tools

- [Specification](http://swagger.io/specification/) - How to write Open API documents.

- [Swagger UI](http://editor.swagger.io) - A tool for writing Open API documents.

- [Open API Enforcer](https://www.npmjs.com/package/openapi-enforcer) - A NodeJS tool for validating, transforming, and querying against your Open API documents.

- [Open API Enforcer Middleware](https://www.npmjs.com/package/openapi-enforcer-middleware) - An [Express](https://expressjs.com/) middleware that implements the Open API Enforcer library.

## Sample Open API Document

The following Open API document:

- Uses Open API specification version 3.0.2

- Defines a path `/my/path` that can accept a single query parameter `x` that is a number.

- The path returns a date-time string.

```yaml
openapi: '3.0.2'
info:
  title: 'My API'
  version: '1.0'
paths:
  /my/path:
    get:
      parameters:
        - name: x
          in: query
          schema:
            type: number
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: string
                format: date-time
```

# HTTP Methods

The most commonly used HTTP methods are these four:

| HTTP Method | Meaning / Usage | Idempotent |
| GET | Retrieve the resource or resource collection. | Yes |
| POST | Create a new resource or resource collection. | No |
| PUT | Put a resource or resource collection into the specified state. | Yes |
| DELETE | Delete a resource or resource collection. | Yes |

<--

What does idempotent mean?

--

Idempotent operations are those that can be called more than once with the same inputs without having any additional side effects beyond what happened with the first call.

It’s safe to retry when the state is indeterminate.

The internet is unreliable. If a web service call fails mid operation then the client does not know the new state (whether the operation was successful). Idempotent methods allow the client to make the request again without having to check to state first. Non idempotent methods must have the state checked before possibly retrying an operation.

-->

# From Domain Driven Design to REST

After you have defined your [domain events, commands, entities, and value objects](domain-driven-design.md) it is easy to define the REST endpoints that provide access to either read the entities and value objects or to issue commands.

Start by defining the API endpoints (URL and HTTP method) that retrieve your entities and value objects.

From the lesson on [Domain Driven Design](domain-driven-design.md) we defined the following entities for the Splack app.

- Channel
- Message
- Comment
- User

## Query Endpoints

These are the entities we want to be able to retrieve (as well as modify), so we define URL endpoints that allow us to retrieve them. Here are a few examples.

| Query | Url Fragment | HTTP Method | Path Parameters |
| ----- | ------------ | ----------- | --------------- |
| get a list of channels | `/channels` | GET | |
| get a specific channel | `/channels/{channel_id}` | GET | `channel_id` |
| get a list of messages in a channel | `/channels/{channel_id}/messages` | GET | `channel_id` |
| get a specific message | `/channels/{channel_id}/messages/{message_id}` or `/messages/{message_id}` | GET | `channel_id` and `message_id` or just `message_id` | 

The above examples are just one way to define these query endpoints.

## Command Endpoints

To define the command endpoints we take our [Domain Driven Design](domain-driven-design.md) commands and associate them with the proper HTTP methods and URLs.

| Command | URL Fragment | HTTP Method | Path Parameters |
| ------- | ------------ | ----------- | --------------- |
| create a channel | `/channels` | POST | |
| add a user to a channel | `/channels/{channel_id}/users/{user_id}` | PUT | `channel_id` and `user_id` |
| remove a user from a channel | `/channels/{channel_id}/users/{user_id}` | DELETE | `channel_id` and `user_id` |
| post a message | `/channels/{channel_id}/messages` | POST | `channel_id` |

The above examples are just one way to define these command endpoints.

## Representations

Remember that REST is about Representational State Transfer. The representations it uses do not need to match the database or data structures on the back end. They should focus on representing the data in a format that fits the needs of the clients.

To define our representations we use our [Domain Driven Design](domain-driven-design.md) entities and value objects.

This is an example of how we could create our Splack message representation:

```json
{
   "id": "m1",
   "channelId": "ch123",
   "userId": "u1234",
   "body": "This is the message",
   "created": "2020-01-01T08:00:00.000Z",
   "updated": "2020-01-01T08:00:00.000Z",
   "comments": []
}
```

Alternatively you may be interested in organizing your representations using field sets. This gives the client greater control over what they retrieve by allowing the client to specify what data it cares about.

```json
{
   "basic": {   
      "id": "m1",
      "channelId": "ch123",
      "userId": "u1234",
      "body": "This is the message",
      "created": "2020-01-01T08:00:00.000Z",
      "updated": "2020-01-01T08:00:00.000Z"
   },
   "comments": []
}
```

The client could then query this data multiple ways:

- `/messages/{message_id}?fieldset=basic` // make this the default
- `/messages/{message_id}?fieldset=comments`
- `/messages/{message_id}?fieldset=basic,comments`

# HTTP Status Codes

To respond to client requests you also need to know about HTTP status codes.

These codes tell the client how the request was processed.

- `200` range status codes indicate success.
- `400` range status codes indicate that the client made an error in their request. Details of the error should be shared with the client.
- `500` range status codes indicate that the server had an error. Details of the error should be logged on the server by not shared with the client.

## Common Status Codes

| Status Code | Meaning | Reference |
| ----------- | ------- | --------- |
| 200 | The request was processed successfully. | |
| 400 | There is something wrong with the request. The response body would ideally include a description of what was wrong with the request. | [IETF rfc7231 Client Error 4xx](https://tools.ietf.org/html/rfc7231#section-6.5) [IETF rfc7231 400 Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) |
| 401 | The request requires authentication and the request did not have authentication information. | [IETF rfc7235 401 Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1) |
| 403 | The request provided authentication information but the authenticated user is not authorized to get the results. | [IETF rfc7231 403 Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3) |
| 404 | This status code commonly indicates one of two things which may be distinguished using the response body. It could be that 1) the requested endpoint does not exist or 2) the requested resource does not exist. If the endpoint returns a collection then a `404` should not be used when the collection is empty, instead use a `200` and send back an empty array. | [IETF rfc7231 404 Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) |

### Status Codes Meanings for Specific Methods

| Status Code | Method | Meaning | Reference |
| ----------- | ------ | ------- | --------- |
| 200 | GET | Resource or resources successfully retrieved. | |
| 201 | POST | The resource was created. If a response body is provided then it should represent the resource created. Additionally, a Location header should be set, specifying the endpoint for where the created resource can be retrieved. | [IETF rfc7231 POST](https://tools.ietf.org/html/rfc7231#section-4.3.3) |
| 200 | PUT | The resource already existed and was set to the specified value. If a response body is provided then it should represent the resource that was PUT. | [IETF rfc7231 PUT](https://tools.ietf.org/html/rfc7231#section-4.3.4) |
| 201 | PUT | The resource was created. If a response body is provided then it should represent the resource created. | [IETF rfc7231 PUT](https://tools.ietf.org/html/rfc7231#section-4.3.4) |
| 204 | DELETE | The resource was deleted (i.e. now does not exist) and no response body is being sent. | [IETF rfc7231 DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5) |

# Exercise

Take the Domain Driven Design that you have already created and convert that design into OpenAPI documentation as appropriate.

You can use the [Online Swagger Editor](http://editor.swagger.io/) to get started. For larger projects you may be interested in the [OpenAPI Enforcer CLI's editor](https://www.npmjs.com/package/openapi-enforcer-cli).

Refer to the [online documentation](https://swagger.io/resources/open-api/) for learning how to write an OpenAPI document.
