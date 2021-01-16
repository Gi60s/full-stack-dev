---
title: DDD Document
description: Example DDD DOcument
---

This is an example DDD document that was built following the principles found in the [Domain Driven Design page](../fundamentals/domain-driven-design).

## Events

### User Account Events
- user account created
- user account deleted
- user account updated
- user password updated

### Task List Events
- task list created
- task list deleted
- task list updated
- task moved to tasklist
- task order changed in tasklist

### Task Events
- task created
- task deleted
- task updated
- file added to task
- file removed from task

### File Events
- file uploaded
- file deleted

## Commands

### User Account Commands

- create user account
- set user account data
- delete user account
- authenticate user

### Task List Commands

- create task list
- set task list data
- delete task list
- create task for tasklist

### Task Commands

- set task data
- delete task

### File Commands

- upload file
- delete file

## Queries

- get account info
- get list of tasklists
- get a single tasklist
- get tasklist tasks
- download file

## Entities

### User Account

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | UUID | Automatically generated, immutable, unique identifier. |
| username | text | The user's chosen display name. |
| password | encrypted text | The user's password. |

### Task List

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | UUID | Automatically generated, immutable, unique identifier. |
| account id | UUID | The account ID that this task belongs to. |
| name | text | The name of the tasklist. |

### Task

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | UUID | Automatically generated, immutable, unique identifier. |
| task list id | UUID | The id of the task list that this belongs to. |
| description | text | A description of the task. |
| due | date | The due date or null if no due date. |
| completed | date | The date completed or null if incomplete. |

## Value Objects

### File

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | UUID | Automatically generated, immutable, unique identifier. |
| task id | UUID | The ID of the task that this belongs to. |
| name | text | The name for the file. |
| mime type | text | The file's mime type. |
| file path | text | The file's location. |