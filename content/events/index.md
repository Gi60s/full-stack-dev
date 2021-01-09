---
title: Event Architectures
description: Loosely coupled events can be a very powerful tool toward building large interconnected applications.
---

## Event Architecture Paradigm

Event driven architectures introduce a paradigm shift.

We drop tightly coupled interconnected systems for loosely coupled interconnected systems.

<question-answer q="What is the difference beween loosly coupled and tightly coupled?">

Tightly coupled systems are highly dependent on one another. From a JavaScript context, if you call a function then that function needs to exist or the code will crash.

Loosely coupled systems are less dependent. We'll see some JavaScript examples soon.

</question-answer>

- Use events and reactions to events to execute code.
- Can allow for loose coupling of code. In other words, code is less dependent on other pieces of code.
- Improves flexibility in your code, making it easy to add features without compromising existing features.
- Everything is asynchronous.
- Is generally harder to debug.
- Becoming more common.


- Use events and reactions to events to execute code.
- Can allow for loose coupling of code. In other words, code is less dependent on other pieces of code.
- Improves flexibility in your code, making it easy to add features without compromising existing features.
- Everything is asynchronous.
- Is generally harder to debug.
- Becoming more common.

## Event Streams

- We are already familiar with how JavaScript can have handlers attached to events.
- Event streams decouple events from the handlers.
- You can create event streams that are fed from other streams or events.
- Event streams with Functional Reactive Programming make state management easy.

### JavaScript Event Streams

- [Bacon.js](https://baconjs.github.io/)
- [RxJS](https://github.com/Reactive-Extensions/RxJS)

### Network Event Streams

Two highly popular systems for sending lots of events over the internet: 

- [RabbitMQ](https://www.rabbitmq.com/) - Excels at routing messages
- [Kafka](https://kafka.apache.org/) - Excels at replayability (event sourcing)

### Online Video Game Example

How are online video games able to keep the game in sync so well?

<question-answer q="Does it make sense to send your online character's position, direction, speed, etc. every 100 milliseconds or so?">

No, that is way too much data to transmit, especially if there are many players playing at once.

</question-answer>

Think of...
 
- an RTS like Starcraft or Warcraft
- a MOBA like League of Legends or Dota
- a FPS like Overwatch, Battlefield, Apex Legends, Fortnite

<question-answer q="What actions are taken in these games and how could you concisely describe them as events?">

How about:

- Player X clicked point Y at time Z
- Player A pressed key B at time C
- Player A released key B at time C

</question-answer>

How do these events translate to game play?

- These micro events are very small to send.
- Your machine sends the events out and reads events from all other players in.
- You machine knows that player A pressed key B at time C and updates your gaming client to reflect that event.

Replays:

- Some games allow you to watch replays from any point of view at any point in time.
- A replay is easy because you already have a list of all the events that occurred and when they occurred.
- It's easy to fast-forward events, but rewinding is slow. To rewind you need to go back to a previous snapshot and play the events forward to the time of interest.

## Event Source

- You create a database for recording all events.
- You record events, not states.
- Events are never deleted and never modified.
- You may want to user a WORM drive (write once read many)

### Banking Example

Your bank account balance is not a row in some table.

If you pay money to the grocery store, your "row" is not updated to remove that cash while simultaneously changing the grocery stores "row" to add that cash.

- What happens if you drop your cash but fail to increase the grocery store's cash?
- What happens if the grocery store is getting lots of cash all at once? How do you keep updates from overwriting other updates?

Your bank account exists as a series of transactions (events)

- To get the balance of any account, sum all of the transactions up.
- It can take a long time to sum up all transactions if there are a lot, so the bank takes snapshots:
    "As of Thursday at 6:00 AM the account balance was $12"
- Now the bank can sum up transactions from that snapshot.

 
