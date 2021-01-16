---
title: REST API Design
description: Example REST API Design
---

From the [REST API Design page](../fundamentals/rest) we learn how to convert our [DDD document](./ddd-document) into a REST interface. This is still high level and we'll get into the details and documenting of the REST API later.

## User Account

### Commands

| Command | URL Fragment | Method | Path Parameters |
| ------- | ------------ | ------ | --------------- |
| create user account | `/accounts` | POST | |
| set user account data | `/accounts/{username}` | PUT | `username` |
| delete user account | `/accounts/{username}` | DELETE | `username` |
| authenticate user | `/authentications` | PUT | |

### Queries

| Query | URL Fragment | Method | Path Parameters |
| ----- | ------------ | ------ | --------------- |
| get account info | `/accounts/{username}` | GET | `username` |

### Representations

**Set Account Info**

```json
{
  "username": "string",
  "password": "string"
}
```

**Get Account Info**

```json
{
  "username": "string",
  "taskLists": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

## Task List

### Commands

| Command | URL Fragment | Method | Path Parameters |
| ------- | ------------ | ------ | --------------- |
| create task list | `/task-lists` | POST | |
| set task list data | `/task-lists/{taskListId}` | PUT | `taskListId` |
| delete task list | `/task-lists/{taskListId}` | DELETE | `taskListId` |
| create task for tasklist | `/task-lists/{taskListId}/tasks` | POST | `taskListId` |

### Queries

| Query | URL Fragment | Method | Path Parameters |
| ----- | ------------ | ------ | --------------- |
| get list of tasklists | `/task-lists` | GET | |
| get a single tasklist | `/task-lists/{taskListId}` | GET | `taskListId` |

### Representations

**Set Tasklist**

```json
{
  "name": "string"
}
```

**Get Tasklist**

```json
{
  "id": "string",
  "name": "string",
  "tasks": [
    {}
  ]
}
```

## Task

### Commands

| Command | URL Fragment | Method | Path Parameters |
| ------- | ------------ | ------ | --------------- |
| set task data | `/tasks/{taskId}` | PUT | `taskId` |
| delete task | `/tasks/{taskId}` | DELETE | `taskId` |

### Queries

None. Use tasks list query.

### Representations

**Set Task**

```json
{
  "description": "string",
  "due": "2021-01-01T00:00:00.000Z",
  "completed": null
}
```

**Get Task**

```json
{
  "id": "string",
  "description": "string",
  "due": "2021-01-01T00:00:00.000Z",
  "completed": null,
  "files": [
    {}
  ]
}
```

## Files

### Commands

| Command | URL Fragment | Method | Path Parameters |
| ------- | ------------ | ------ | --------------- |
| upload file | `/tasks/{taskId}/files` | POST | `taskId` |
| delete file | `/files/{fileId}` | DELETE | `fileId` |

### Queries

| Query | URL Fragment | Method | Path Parameters |
| ----- | ------------ | ------ | --------------- |
| download file | `/files/{fileId}` | GET | `fileId` |

### Representations

Not applicable. Will transfer using either octet streams or base64 encoded data streams.