---
title: OpenAPI Specification 
description: An introduction to the OpenAPI Specification.
---

## Open API Specification

### History

There had been several attempts to document REST APIs in the past. Most notably:

- 2009 Sun Microsystems presented Web Application Description Language (WADL).
- 2011 Tony Tam improved on the idea of WADL with [Swagger](https://swagger.io/).
- 2016 The Swagger specification was renamed to the OpenAPI specification and it's work now falls under the Linux Foundation.

### Swagger vs OpenAPI

OpenAPI is the specification.

Swagger is a set of official tools.

The [Swagger website](https://swagger.io/) still hosts a copy of the OpenAPI specification.

### What is OpenAPI?

- A specification for helping you to document and define your REST API.
- Helps you to plan and organize your REST API.
- Documents your REST API for other's to consume.
- Has tools that enforce your API.

### OpenAPI Tools

This is a list of some OpenAPI tools.

- [Specification](http://swagger.io/specification/) - How to write OpenAPI documents.
- [Swagger UI](http://editor.swagger.io) - A tool for writing OpenAPI documents.
- [OpenAPI Enforcer](https://www.npmjs.com/package/openapi-enforcer) - A NodeJS tool for validating, transforming, and querying against your Open API documents.
- [OpenAPI Enforcer Middleware](https://www.npmjs.com/package/openapi-enforcer-middleware) - An [Express](https://expressjs.com/) middleware that implements the Open API Enforcer library.

### Sample OpenAPI Document

The following OpenAPI document:

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