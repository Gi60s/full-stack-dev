---
title: Web Sockets
description: Web socket technology allows you to keep an open data stream between the client and server. This can speed up data sharing but also enables the server to push data to the client without the client having to ask for it.
---

## Introduction

Web socket technology allows you to maintain an active connection between the client and the server.

- The client and server negotiate a connection and keep it open.
- The client can send events / messages to the server.
- The server can send events / messages to the client without the client making a request for data.

## Socket IO

Socket IO is the most popular NodeJS library for managing sockets.

https://socket.io/get-started/chat/

### Demo

https://github.com/socketio/chat-example.git

1. Clone from github: `git clone https://github.com/socketio/chat-example.git`.
2. Navigate into the `chat-example` directory.
3. Install NPM dependencies: `npm install`
4. Start the server: `npm start`