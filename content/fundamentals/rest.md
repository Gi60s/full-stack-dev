---
title: REST 
description: REST API Concepts and moving from DDD to REST.
---

## Web Services

A web service is a service that is available to clients to use via the web through an API.

<question-answer q="What is a client?">

A client is generally an application on a computer that is accessing services from another application. The services that the client accesses may be on another computer across the network.

</question-answer>

<question-answer q="What is an API?">

API stands for application programmable interface. An API provides inputs and outputs for a set of functionality whose implementation details are kept from the client.

</question-answer>

<question-answer q="Thinking of past programming experiences, are functions (a.k.a. methods) technically considered APIs themselves? Why?">

A function is an API. That API may not be accessible outside of the application, but internally it is used by the application. Inputs are provided and outputs are returned. What happens inside that function is hidden from the code that called the function. A function may be the simplest form of an API.

</question-answer>

## REST

REST is a standard for consuming web services.

- Stands for *Representational State Transfer*
- Used for sending data bidirectionally between a client and a server.
- Commonly a client browser uses AJAX to make requests to the server.

<question-answer q="A browser can act as a client, using AJAX to make API requests to a server. It is also possible for one server to make API requests to another server. Why would this be helpful?">

Servers use API's a lot. One server may use an API to access a database (although database connections do not use REST). A server may also not have all the information it needs to fulfill a request but it knows where to find it, so it can make requests to another server's API for the data.

</question-answer>

<question-answer q="How do you know how to use an API? For example, in the case of a function, how do you know what inputs are required, what the function does, and what the expected results or failure conditions are?">

It needs to be documented, or alternatively you can dig into the code to see how it works.

</question-answer>

## REST Endpoints

An endpoint is an accessible URL that clients can call to perform actions or queries on the server. Each endpoint is defined by a URL and an HTTP method.

### HTTP Methods

The most commonly used HTTP methods are these four:

| HTTP Method | Meaning / Usage | Idempotent | Body |
| ----------- | --------------- | ---------- | ---- |
| GET | Retrieve the resource or resource collection. | Yes | No |
| POST | Create a new resource or resource collection. | No | Yes |
| PUT | Put a resource or resource collection into the specified state. | Yes | Yes |
| DELETE | Delete a resource or resource collection. | Yes | No |

<question-answer q="What does idempotent mean?">

Idempotent operations are those that can be called more than once with the same inputs without having any additional side effects beyond what happened with the first call.

It’s safe to retry when the state is indeterminate.

The internet is unreliable. If a web service call fails mid operation then the client does not know the new state (whether the operation was successful). Idempotent methods allow the client to make the request again without having to check to state first. Non idempotent methods must have the state checked before possibly retrying an operation.

</question-answer>

### HTTP URLs

REST URLs should use plural nouns (not verbs) to define the endpoint.

**Good Examples**

- `POST /tasks` - create a task
- `PUT /tasks/{task_id}` - update a task

**Bad Examples**

- `POST /create-task`
- `PUT /update-task` 
 
## From Domain Driven Design to REST

After you have defined your [domain events, commands, entities, and value objects](domain-driven-design.md) it is easy to define the REST endpoints that provide access to either read the entities and value objects or to issue commands.

Start by defining the API endpoints (URL and HTTP method) that retrieve your entities and value objects.

From the lesson on [Domain Driven Design](domain-driven-design.md) we defined the following entities for the To Do app.

**Account (entity)**

| Properties | Events | Commands | Queries |
| ---------- | ------ | -------- | ------- |
| <ul><li>id (string)</li><li>username (string)</li><li>password (string)</li><li>task lists (array of task lists)</li></ul> | <ul><li>account created</li><li>account updated</li><li>account deleted</li></ul> | <ul><li>create an account</li><li>delete an account</li><li>update account password</li><li>validate password</li></ul> | None |

**Task List (entity)**

| Properties | Events | Commands | Queries |
| ---------- | ------ | -------- | ------- |
| <ul><li>id (string)</li><li>name (string)</li><li>tasks (array of tasks)</li></ul> | <ul><li>task list created</li><li>task list updated</li><li>task list deleted</li></ul> | <ul><li>create a task list</li><li>rename a task list</li><li>delete a task list</li></ul> | <ul><li>list all task lists for account</li><li>get a specific task list</li></ul> |

**Task (entity)**

| Properties | Events | Commands | Queries |
| ---------- | ------ | -------- | ------- |
| <ul><li>id (string)</li><li>description (string)</li><li>completed (date)</li><li>due (date)</li><li>files (array of files)</li></ul> | <ul><li>task created</li><li>task marked complete</li><li>task marked incomplete</li><li>task description updated</li><li>task due date set</li><li>task due date removed</li><li>file added to task</li><li>file removed from task</li></ul> | <ul><li>create a task</li><li>update a task description</li><li>delete a task</li><li>mark task complete</li><li>mark task incomplete</li><li>add file to task</li><li>remove file from task</li></ul> | <ul><li>get a list of tasks</li><li>get a single task's details</li><li>download a task's file</li></ul> |

**File (value object)**

| Properties | Events | Commands | Queries |
| ---------- | ------ | -------- | ------- |
| <ul><li>file path (string)</li><li>file type (string)</li><li>file upload date (ISO 8601 string)</li></ul> | None | None | None |

### Define Endpoints

Convert the queries and commands for entities and value objects into REST endpoints. For getting values without modifying we always use the `GET` method, `POST` is for creating, `PUT` is for setting (upsert), and `DELETE` is for deleting. 

Remember that the URL path should use plural nouns, not verbs.

| Query | Url Fragment | HTTP Method | Path Parameters |
| ----- | ------------ | ----------- | --------------- |
| create an account | `/accounts` | POST | |
| edit account | `/accounts/{account_id}` | PUT | `account_id` |
| delete an account | `/accounts/{account_id}` | DELETE | `account_id` |
| list all task lists for account | `/accounts/{account_id}/tasklist` | GET | `account_id` |
| create a task list | `/accounts/{account_id}/tasklist` | POST | `account_id` |
| rename a task list | `/tasklist/{tasklist_id}` | PUT | `tasklist_id` |
| delete a task list | `/tasklist/{tasklist_id}` | DELETE | `tasklist_id` |
| get a list of tasks | `/tasklist/{tasklist_id}/tasks` | GET | `tasklist_id` |
| create a task | `/tasklist/{tasklist_id}/tasks` | POST | `tasklist_id` |
| update a task (desciption, due date, checked status) | `/tasks/{task_id}` | PUT | `task_id` |
| delete a task | `/tasks/{task_id}` | DELETE | `task_id` |
| add file to task | `/tasks/{task_id}/files` | POST | `task_id` |
| remove file from task | `/tasks/{task_id}/files/{file_id}` | DELETE | `task_id`, `file_id` |

### Representations

Remember that REST is about Representational State Transfer. The representations it uses do not need to match the database or data structures on the back end. They should focus on representing the data in a format that fits the needs of the clients.

To define our representations we use our [Domain Driven Design](domain-driven-design.md) entities and value objects.

**Account**

```json
{
  "id": "u1",
  "username": "string",
  "taskLists": [
    {
      "id": "l123",
      "name": "My List",
      "nextItemDue": "2020-01-01T08:00:00.000Z",
      "completedCount": 7,
      "incompleteCount": 4,  
    }
  ]
}
```

**Task List**

```json
{
  "primary": {
    "id": "l123",
    "name": "My List",
    "nextItemDue": "2020-01-01T08:00:00.000Z",
    "completedCount": 7,
    "incompleteCount": 4,  
  },
  "tasks": [
    {
      "id": "t1",
      "taskListId": "l123",
      "description": "Do this",
      "completed": "2020-01-01T08:00:00.000Z",
      "due": "2020-01-01T08:00:00.000Z",
      "files": [
        {
          "id": "f100",
          "name": "My File",
          "fileType": "png",
          "fileUploadDate": "2020-01-01T08:00:00.000Z"
        }
      ]
    }
  ]
}
```

**Task**

```json
{
  "primary": {
    "id": "t1",
    "taskListId": "l123",
    "description": "Do this",
    "completed": "2020-01-01T08:00:00.000Z",
    "due": "2020-01-01T08:00:00.000Z"
  },
  "files": [
    {
      "id": "f100",
      "name": "My File",
      "fileType": "png",
      "fileUploadDate": "2020-01-01T08:00:00.000Z"
    }
  ]
}
```

### Field sets

In the above representations for Tasks and Task Lists the data is segregated into primary and non-primary data. This allows us to use a concept known as field sets.

A field set gives the client greater control over what they retrieve by allowing the client to specify what data it cares about for that request. The client can use a query parameter (one we define) to specify what data gets returned.

Here are a few examples for how to get information from a task list, using field sets.

- `/tasklist/{tasklist_id}?fieldset=primary` - Get just the default data. We could make this the default.
- `/tasklist/{tasklist_id}?fieldset=tasks` - Get just the list of tasks 
- `/tasklist/{tasklist_id}?fieldset=primary,tasks` - Get all the data about a task list

<question-answer q="Should a REST representation mirror how data is stored in the database?">

No. Although there is nothing wrong with it mirroring the structure of the database, what you really want to accomplish is providing a representation that fits the needs of the client that will make requests against the API.

</question-answer>  

## HTTP Status Codes

To respond to client requests you also need to know about HTTP status codes.

These codes tell the client how the request was processed.

- `200` range status codes indicate success.
- `400` range status codes indicate that the client made an error in their request. Details of the error should be shared with the client.
- `500` range status codes indicate that the server had an error. Details of the error should be logged on the server by not shared with the client.

### Common Status Codes

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

**Exercise**

Take the Domain Driven Design that you have already created and convert that design into OpenAPI documentation as appropriate.

You can use the [Online Swagger Editor](http://editor.swagger.io/) to get started. For larger projects you may be interested in the [OpenAPI Enforcer CLI's editor](https://www.npmjs.com/package/openapi-enforcer-cli).

Refer to the [online documentation](https://swagger.io/resources/open-api/) for learning how to write an OpenAPI document.
