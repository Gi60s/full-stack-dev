---
title: OpenAPI
description: Example OpenAPI Document
---

This page provides an example of taking your [DDD document](./ddd-document) and converting it into an OpenAPI document.

The OpenAPI document is what developers using your API will look at to know how to use your API. There are also tools that can make developing easier if you have an OpenAPI document.

```yml
openapi: '3.0.2'
info:
  title: "To Do API"
  version: "1.0"
paths:
  /accounts:
    post:
      summary: Create account
      tags:
        - Accounts
      x-controller: accounts
      x-operation: createAccount
      requestBody:
        $ref: '#/components/requestBodies/Account'
      responses:
        201:
          description: Account created
          headers:
            Location:
              schema:
                type: string
        409:
          description: Account username already exists.
  /accounts/{username}:
    parameters:
      - $ref: '#/components/parameters/PathUsername'
    get:
      summary: Get account
      tags:
        - Accounts
      x-controller: accounts
      x-operation: getAccount
      security:
        - Bearer: []
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Account'
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    put:
      summary: Change username or password
      tags:
        - Accounts
      x-controller: accounts
      x-operation: updateAccount
      security:
        - Bearer: []
      requestBody:
        $ref: '#/components/requestBodies/Account'
      responses:
        200:
          description: Success
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    delete:
      summary: Delete account
      tags:
        - Accounts
      x-controller: accounts
      x-operation: deleteAccount
      security:
        - Bearer: []
      responses:
        204:
          description: Deleted
        401:
          description: Unathorized
        403:
          description: Forbidden
        500:
          description: Internal Server Error
  /authenticate:
    put:
      summary: Authenticate
      tags:
        - Authentication
      x-controller: authn
      x-operation: authenticate
      requestBody:
        $ref: '#/components/requestBodies/Account'
      responses:
        200:
          description: Success
          content:
            text/plain:
              schema:
                description: JWT
                type: string
        401:
          description: Unathorized
        500:
          description: Internal Server Error
  /tasks/{taskId}:
    parameters:
      - $ref: '#/components/parameters/PathTaskId'
    put:
      summary: Update task
      tags:
        - Tasks
      x-controller: tasks
      x-operation: updateTask
      requestBody:
        $ref: '#/components/requestBodies/Task'
      security:
        - Bearer: []
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    delete:
      summary: Delete task
      tags:
        - Tasks
      x-controller: tasks
      x-operation: deleteTask
      security:
        - Bearer: []
      responses:
        204:
          description: Success
        401:
          description: Unathorized
        403:
          description: Forbidden
        500:
          description: Internal Server Error
  /tasks/{taskId}/files:
    parameters:
      - $ref: '#/components/parameters/PathTaskId'
    post:
      summary: Upload file
      tags:
        - Task Files
      x-controller: tasks
      x-operation: uploadFile
      security:
        - Bearer: []
      requestBody:
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
          multipart/form-data:
            schema:
              type: object
              additionalProperties: true
      responses:
        201:
          description: Uploaded
          headers:
            Location:
              schema:
                type: string
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
  /files/{fileId}:
    parameters:
      - name: fileId
        in: path
        required: true
        schema:
          type: string
    get:
      summary: Get file
      tags:
        - Task Files
      x-controller: tasks
      x-operation: getFile
      responses:
        200:
          description: Success
          content:
            application/octet-stream:
              schema:
                type: string
                format: binary
            application/base64:
              schema:
                type: string
                format: byte
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    delete:
      summary: Delete file
      tags:
        - Task Files
      x-controller: tasks
      x-operation: deleteFile
      security:
        - Bearer: []
      responses:
        204:
          description: Success
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
  /task-lists:
    get:
      summary: Get task lists
      tags:
        - Task Lists
      x-controller: task-lists
      x-operation: getTaskLists
      security:
        - Bearer: []
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/TaskList'
    post:
      summary: Create task list
      tags:
        - Task Lists
      x-controller: task-lists
      x-operation: createTaskList
      security:
        - Bearer: []
      requestBody:
        $ref: '#/components/requestBodies/TaskList'
      responses:
        201:
          description: Created
          headers:
            Location:
              schema:
                type: string
        401:
          description: Unathorized
        403:
          description: Forbidden
        500:
          description: Internal Server Error
  /task-lists/{taskListId}:
    parameters:
      - $ref: '#/components/parameters/PathTaskListId'
    get:
      summary: Get task list
      tags:
        - Task Lists
      x-controller: task-lists
      x-operation: getTaskList
      security:
        - Bearer: []
      parameters:
        - $ref: '#/components/parameters/QueryAllTasks'
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TaskListDetails'
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    put:
      summary: Rename task list
      tags:
        - Task Lists
      x-controller: task-lists
      x-operation: updateTaskList
      security:
        - Bearer: []
      requestBody:
        $ref: '#/components/requestBodies/TaskList'
      responses:
        200:
          description: Success
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    delete:
      summary: Delete task list
      description: This will also delete all tasks on the list.
      tags:
        - Task Lists
      x-controller: task-lists
      x-operation: deleteTaskList
      security:
        - Bearer: []
      responses:
        204:
          description: Deleted
        401:
          description: Unathorized
        403:
          description: Forbidden
        500:
          description: Internal Server Error
  /task-lists/{taskListId}/tasks:
    parameters:
      - $ref: '#/components/parameters/PathTaskListId'
    get:
      summary: Get tasks
      tags:
        - Tasks
      x-controller: tasks
      x-operation: getTasks
      security:
        - Bearer: []
      parameters:
        - $ref: '#/components/parameters/QueryAllTasks'
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
    post:
      summary: Create task
      tags:
        - Tasks
      x-controller: tasks
      x-operation: createTask
      security:
        - Bearer: []
      requestBody:
        $ref: '#/components/requestBodies/Task'
      responses:
        201:
          description: Success
          headers:
            Location:
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        401:
          description: Unathorized
        403:
          description: Forbidden
        404:
          description: Not found
        500:
          description: Internal Server Error
components:
  parameters:
    PathTaskId:
      name: taskId
      in: path
      required: true
      schema:
        type: string
    PathTaskListId:
      name: taskListId
      in: path
      required: true
      schema:
        type: string
    PathUsername:
      name: username
      in: path
      required: true
      schema:
        type: string
    QueryAllTasks:
      name: allTasks
      in: query
      schema:
        type: boolean
  requestBodies:
    Account:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Account'
    Task:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Task'
    TaskList:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/TaskList'
  schemas:
    Account:
      type: object
      properties:
        username:
          type: string
        password:
          type: string
          writeOnly: true
        taskLists:
          type: array
          readOnly: true
          items:
            $ref: '#/components/schemas/TaskList'
    File:
      type: object
      properties:
        id:
          type: string
          readOnly: true
        name:
          type: string
        mimeType:
          type: string
    Task:
      type: object
      required:
        - description
        - due
      properties:
        id:
          type: string
          readOnly: true
        description:
          type: string
        due:
          type: string
          format: date-time
          nullable: true
        completed:
          type: string
          format: date-time
          nullable: true
        files:
          type: array
          readOnly: true
          items:
            $ref: '#/components/schemas/File'
    TaskList:
      type: object
      properties:
        id:
          type: string
          readOnly: true
        name:
          type: string
    TaskListDetails:
      allOf:
        - $ref: "#/components/schemas/TaskList"
        - type: object
          properties:
            tasks:
              type: array
              items:
                $ref: "#/components/schemas/Task"
  securitySchemes:
    Bearer:
      type: http
      scheme: bearer
```