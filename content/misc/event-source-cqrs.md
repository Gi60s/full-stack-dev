---
title: Event Sourcing and CQRS
description: This page will introduce a topic that will challenge the traditional application architecture. It will begin by briefly covering a traditional application architecture and then introduce an alternative architecture.
---

## Introduction

This page will introduce a topic that will challenge the traditional application architecture. It will begin by briefly covering a traditional application architecture and then introduce an alternative architecture.

## Traditional Applications

*The content in this section is adapted from http://blog.softmemes.com/2016/11/12/using-cqrs-with-event-sourcing/, so check out that webpage for a great read.*

Traditional applications have a three layered approach.

- Layer 1: The UI where the user can interact with your application.
- Layer 2: The business logic that takes requests from the UI and communicates with the data layer.
- Layer 3: The data layer, databases, etc.

### C.R.U.D.

Most applications use the Create, Read, Update, Delete methodology.

With a CRUD based REST API the `POST`, `PUT`, and `DELETE` methods make changes to our data layer. The `GET` method is for reading our data layer.

### Read and Write Concerns

#### Writing

- Enforcing data integrity.
- Providing atomic updates / transactions.
- Facilitating version control.
- Enforcing write permissions.

#### Reading

- Perform efficient searches and lookups.
- Calculate derived values (sums, etc.).
- Provide multiple views of the data.
- Enforce row and column level presentation.

<question-answer q="Between SQL and NoSQL databases, which is better at addressing write concerns and which is better at addressing read concerns?">

SQL databases are better at writing: Enforcing data integrity, performing atomic updates, version control, and write permissions.

NoSQL databases are better at reading: efficient searches and lookups, generating derived values, providing multiple views of the data, and presenting data in the correct format.

</question-answer>

## Micro Services

A micro service is a specialized application that encapsulates its own logic and data.

- It has its own API for external application to get or send data to it.
- It specializes to a very specific domain.
- It isn't the amount of code or data that defines a micro service, it's the scope of the service.
- Because micro services are so specialized they are usually not much code.

A few examples:

- A To Do application may keep track of tasks, task lists, and accounts. Together these three things do not constitute a micro service.
- A micro service would probably specialize in just account management.
- Another micro service may specialize in authentication.
- Tasks and task lists may be a single micro service or separate services.

## Event Streams

- We are already familiar with how JavaScript can have handlers attached to events.
- Event streams decouple events from the handlers.
- You can create event streams that are fed from other streams or events.
- Event streams with Functional Reactive Programming make state management easy.

**Reactive Libraries**

- [Bacon.js](https://baconjs.github.io/)
- [RxJS](https://github.com/Reactive-Extensions/RxJS)

Check out some [examples in the IT410-resources repository](https://github.com/Gi60s/it410-resources/tree/master/functional-reactive-programming).

## Event Sourcing

- You create a database for recording all events.
- Events are never deleted and never modified. You may want to user a WORM drive (write once read many).
- Events can be replayed.
- You record events, not states. You don't know what states may be generated from the event, so you can't store the states in the event source database.

## C.Q.R.S.

- C.Q.R.S. stands for Command Query Responsibility Segregation.
- A traditional C.R.U.D. application cannot excel in both reads and writes, but a C.Q.R.S. system can.
- C.Q.R.S. does introduce additional complexity and eventual consistency.
- C.Q.R.S. uses an event source database to help accomplish its objectives.

### Terminology

- **Command** - A command or direction that should be implemented. For example: "update user email".
- **Event** - A command that has been executed becomes an event. For example: "updated user email".
- **Query** - A request to read data.

### Command to Event Flow

A REST API uses `POST`, `PUT`, or `DELETE` to indicate an update.

1. The REST request can indicate a **command** or it can be a traditional representation.
    - If a traditional representation is used, the REST server will need to identify what has changed in the resource and convert that to a **command**.
2. The **command** is evaluated to see if it can be executed. This is primarily a permission check.
3. If the **command** can be executed then it is converted into an **event**.
4. The **event** is saved to the event source database.
5. The REST API responds that the update was successful. It will not often send back the update details, such as what the new resource looks like, because it doesn't know yet. That will happen asynchronously.

A separate service is watching for new events to hit the event source database. When one arrives it emits the event.

This process is eventually consistent, but it does keep data integrity.

### Event Subscribers

- A subscriber is usually a micro service with its own specialized data store. It stores data in a very specific denormalized format.
- It receives the event and updates its own data.

There are some cases where a subscriber can receive too many events too fast to update its own data store. To solve this problem you can use snapshots.

A snapshot is the state in a moment in time. If additional events come in and the data is queried between snapshots then it will grab the snapshot state, calculate changes based on the events that have occurred, and return the new computed state.

### Query Flow

A REST API uses the `GET` method to indicate a query.

1. The query is interpreted to determine which micro services to ask for data.
2. Each micro service checks permissions and then gives the data back to the API service. This is very fast because the micro service will have the denormalized data already available as a single lookup.
3. The API service aggregates the data, transforms it as necessary, and then sends the response back to the client.

### Introducing New Micro Services to an Existing C.Q.R.S. System

Imagine you want to look at your data from a different angle.

Example: In the past your retail website "Amazont" has only cared about final checkout price and items in the cart, but now the boss wants to know if the customer dropped any items from the cart prior to checking out.

- Start a new micro service that keeps track of items dropped from the cart before checkout.
- Go through every event in the event source database and build the micro service's specialized data store.
- Once all events in the event source database have been looked at, start a subscription for any new events.
- You can now query this micro service to easily know what items were dropped from carts prior to checkout.
- This type of time travel data building is not possible without an event source database.

## Examples

Below are two examples of where C.Q.R.S. systems are often used.

### Banking Example

<question-answer q="Why is a banking application a good candidate for C.Q.R.S.?">

Your account balance is the summation of immutable financial transactions.

Every time you money comes into our out of your account there is a new financial transaction. These transactions are never deleted.

1. You can use commands to perform a financial transaction.
2. The transaction gets saved to the event source database.
3. Subscribers store relevant information about the event, such as:
    - Your new account balance.
    - Updating your monthly statement.
4. Querying your balance is fast.

</question-answer>

### Online Video Game Example

Most online video games on a good internet connection will have between 20 and 50 milliseconds of latency. That means that if you do something in the game then everyone else should see that happen within 20 to 50 milliseconds. (That is assuming a good internet connection and not too many hops on the network.)

<question-answer q="When you play an online video game, your game has to stay in sync with everyone else who is playing. How does C.Q.R.S. help in this scenario?">

It is too much to transmit your online character's position, direction, speed, and what they're doing every 20 milliseconds. Instead, it's easier to transmit the actions your online character is making and when they are being made.

</question-answer>

<question-answer>
<template v-slot:question>

Think of...
 
- an RTS like Starcraft or Warcraft,
- a MOBA like League of Legends or Dota,
- a FPS like Overwatch or Battlefield,
- a Battle Royale like PlayerUnknown's Battlegrounds, Fortnite, or Apex Legends.

What actions are taken in these games and how would you describe them as commands?

</template>

Here are a few possible examples. Each of these would be accompanied by a timestamp:

- Player A spawned at coordinates X, Y
- Player A started moving forward at 3 feet per second
- Player A started rotating to the right at 10 degrees per second
- Player A stopped rotating
- Player A stopped moving forward.
- Player A started moving left (strafing) at 5 feet per second

</question-answer>

<question-answer q="How do these commands translate into game play?">

- These micro events are very small to send.
- Your machine sends the events out and reads events from all other players in.
- You machine knows what each player is doing and when and updates gaming client to reflect what occurred.

</question-answer>

<question-answer q="Some video games allow you to rewatch your game from different angles, different perspectives, etc. How does C.Q.R.S. and event sourcing accomplish that?">

- A replay is easy because you already have a list of all the events that occurred and when they occurred.
- It's easy to fast-forward events, but rewinding might be slow. To rewind you need to go back to a previous snapshot and play the events forward to the time of interest.

</question-answer>
