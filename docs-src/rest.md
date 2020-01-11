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

# Exercise

Take the Domain Driven Design that you have already created and convert that design into OpenAPI documentation as appropriate.

You can use the [Online Swagger Editor](http://editor.swagger.io/) to get started. For larger projects you may be interested in the [OpenAPI Enforcer CLI's editor](https://www.npmjs.com/package/openapi-enforcer-cli).

Refer to the [online documentation](https://swagger.io/resources/open-api/) for learning how to write an OpenAPI document.
