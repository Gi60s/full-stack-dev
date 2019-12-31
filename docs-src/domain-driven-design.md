---
title: Domain Driven Design 
toc: 2
---

# Introduction

> We fail more often because we solve the wrong problem than because we get the wrong solution to the right problem.
>
> -- Russell L. Ackoff

This page will take you through an example of discovering a domain following [Vaughn Vernon's DDD](https://vaughnvernon.co/) principles. The example will be a messaging application that is very similar to Slack, but with a lot less features.

As you will be building your own web application as the final project for the class you will want to understand and implement these same practices before you even begin to write any code at all.

# Scenario
  
The examples outlined in this page will follow a specific scenario, as if we were actually trying to build a working API.

We are building a very lightweight alternative of Slack for internal messaging. We want channels, messages, and comments. We do not care about emoji's, file uploads, voice chat, videos, etc.

# DDD Steps

Proper domain driven design requires the input of the domain expert. The domain expert is most often the business for which the API is being created. The business understands the processes and procedures their business operates under, and creating a definition of their domain requires their knowledge. Use the domain expert (the business partner) to help you define events, commands, entities, and aggregates.

## Define Events

The first step to defining your domain is to list the events that occur. An event is something that has happened in the past, is finite, and completed.

### Exercise

Enumerate all the events that the domain would raise. Typically, events contain a noun coupled with a past intransitive verb phrase.

<--

What are the events that you can think of for our Splack application?

--

For our messaging app here are some of our events:

- channel created
- user joined channel
- user left channel
- channel basic info updated
- channel deleted
- message posted
- message updated
- message deleted
- comment made on message
- comment updated
- comment deleted

-->

## Define Commands

The next step in defining your domain is identifying and defining the commands. Commands enact state changes. Those state changes are represented in the events you've already defined.

According to the principles in Domain Driven Design, these commands should not be "anemic". Name your commands according to real business processes or actions that would be expressed by your business domain experts. Martin Fowler describes more on an Anemic Domain Model here.

### Exercise:

After you've listed all the domain's events, list the commands that would produce the events.

<--

What are the commands that our Splack app should have?

--

Our messaging API could have these commands:

- create a channel
- add user to a channel
- remove user from a channel
- update channel's basic info
- delete channel
- post a message
- update a message
- delete a message
- comment on a message
- update a comment
- delete a comment

-->

## Define Entities and Value Objects

After you've listed the possible events and described the commands to produce them you can now identify what Eric Evans describes in his book on [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) as "entities" and "value objects".

Entities and value objects are used to represent groups of data. The difference between these two concepts has to do with identity, lifespan, and mutability:

|           | Entity | Value Object |
| --------- | ------ | ------------ |
| Identity | Has a unique identifier. | Can be identified by structure. |
| Lifespan | Has a history (even if not stored) of its creation and changes. | None. |
| Mutability | Can change over time. | Unchangeable. |
| Example | A person. | A circle. |

### Exercise

Using the list of commands you've already come up with:

- Identify the entities and value objects for your domain.
- Identify the properties that make up the entities and domain objects.
- Identify the type of data for each property

<--

What are the entities and value objects we should have for our Splack app?

--

**Entities**

- Channel
- Message
- Comment
- User

**Value Objects**

- Avatar

-->

<--

What are the properties and types associated with our Splack app's entities and value objects?

--

Channel (entity)

- id (string)
- title (string)
- description (string)
- messages (array of message entities)
- members (user value object)
 
Message (entity)

- id (string)
- body (string)
- posted by (user ID)
- posted date (ISO 8601 string)
- updated date (ISO 8601 string)
- comments (array of comment entities)
 
Comments (entity)

- id (string)
- body (string)
- posted by (user ID)
- posted date (ISO 8601 string)
- updated date (ISO 8601 string)

User (entity)

- id (string)
- name (string)
- avatar (picture)

Avatar (value object)

- file name (string)
- file type (string)
- file upload date (ISO 8601 string)

-->

<--

Think of a scenario where something that might be considered an entity would actually be a value object. How could this be?

--

Consider a `User` in our system.

- Identity - yes, our user has a unique ID
- Lifespan - yes, we track a user's name changes
- Mutability - yes, our user changes

It is possible to use an external user management system. For example, many apps allow you to authenticate with Google, Facebook, etc. If our system did not manage users here, instead authenticating with a third party provider, a `User` object could still have the same properties but would only be read from the provider.

As a value object:

- Identity - yes, we know the foreign identity of the user, as defined by the third party.
- Lifespan - no, we don't track changes. The values that the provider gives us may change over time, but we don't care and we don't keep track.
- Mutability - no, we use the foreign identity and that does not change. Changes to the user's name or avatar are not considered changes, but rather a replacement of data.

-->
