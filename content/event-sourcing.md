---
title: Event Sourcing and CQRS
toc: Loosely coupled events and event replayability can enable flexible and powerful applications. 
---

## Event Streams

- We are already familiar with how JavaScript can have handlers attached to events.
- Event streams decouple events from the handlers.
- You can create event streams that are fed from other streams or events.
- Event streams with Functional Reactive Programming make state management easy.

### Reactive Libraries

- [Bacon.js](https://baconjs.github.io/)
- [RxJS](https://github.com/Reactive-Extensions/RxJS)

Check out some [examples in the IT410-resources repository](https://github.com/Gi60s/it410-resources/tree/master/functional-reactive-programming).

## Event Sourcing

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

## Online Video Game Example

How on earth are online video games able to keep the game in sync so well?

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

# C.Q.R.S.

REST interface on the outside converts requests into commands or queries

## Command Flow

- Incoming REST request is interpreted as a command to update data.

- Command is evaluated to see if it can be performed

- If command is executable then it becomes an event

- The event gets stored into an event source database and can never be modified or deleted

- The client that made the request is informed that it will eventually succeed

- A process identifies that a new event exists in the event source databases and publishes it to all subscribers for that event type

- This process is eventually consistent, but it does keep data integrity.

## Micro Service Subscriber

- A subscriber is usually a micro service with its own specialized data store.

    It stores data in a very specific denormalized format.

- It receives the event and updates its own data.

## Query Flow

- Incoming REST request is interpreted as a query for data.

- The API gateway knows which micro service has that particular data and routes it to the micro service.

- The micro service does an easy lookup in its specialized data store for that data. No joins of data need occur.

- The micro service sends back the requested data.

## Making New Micro Services

Imagine you want to look at your data from a different angle.

Example: In the past your retail website "Amazont" has only cared about final checkout price and items in the cart, but now the boss wants to know if the customer dropped any items from the cart prior to checking out.

- Start a new micro service that keeps track of items dropped from the cart before checkout.

- Go through every event in the event source database and build the micro service's specialized data store.

- Once all events in the event source database have been looked at, start a subscription for any new events.

- You can now query this micro service to easily know what items were dropped from carts prior to checkout.

- This type of time travel data building is not possible without an event source database.
