---
title: NoSQL Databases
toc: 1
---

# NoSQL

- NoSQL stands for Not Only Structured Query Language

- You can organize your data in fixed structures or they can be free.

- NoSQL databases promote denormalization and eventual consistency.

    - Denormalization - there is duplicate data (faster to read, slower to update)

    - Eventual consistency `- writes must occur but it is less important that reads are immediately up to date.

# Document Databases

- Highly available, high performance, easy to scale.

- Instead of storing rows (like you would do in an SQL database) you store documents. A document is very similar to the JavaScript object.

    ```js
    {
        name: 'Bob',
        age: 25,
        roles: ['Support', 'Developer']
    }
    ```

- You can perform searches using the document key or indexes (very fast) or by searching for documents with specific structures (slower).


## SQL Databases vs Document Databases

There isn't exactly a one-to-one relationship between the concepts you may be familiar with from SQL, but there are similarities.

- [SQL Comparison](https://docs.mongodb.org/manual/reference/sql-comparison/)
- [SQL Aggregation](https://docs.mongodb.org/manual/reference/sql-aggregation-comparison/)

# MongoDB

- One of several document databases.

- Run a server that has an API to get and set data in the database.

- Use a client that interfaces with the server API.

Docker Hub has a MongoDB image: https://hub.docker.com/_/mongo

## MongoDB Node Client

- [mongodb](https://www.npmjs.com/package/mongodb) - Use this module for a simple interface for connecting to your MongoDB instance.

- [Documentation](http://mongodb.github.io/node-mongodb-native/)

## Node MongoDB API

- Node Package: https://www.npmjs.com/package/mongodb

- Find the API at http://mongodb.github.io/node-mongodb-native/3.0/api/index.html

- Functions in the API that take a callback often also will return a promise if no callback is supplied.

## Collections

[Collections API](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html)

Before you can start reading from and writing to your database, you'll have to specify the collection that you are interested in. If you specify a collection that doesn't exist then it will create it for you when you do an insert.

```js
MongoClient.connect(url)
    .then(db => {
        const collection = db.collection('test');
        collection.insertOne({ foo: 'bar' })
            .then(function(result) {
                console.log(result);
                db.close();
            })
            .catch(function(e) {
                console.error(e.stack);
            });

    });
```

## Insert

There are various insert methods:

- insert (deprecated)
- insertOne
- insertMany

## Find

You can use find to get back a cursor. A cursor is a pointer to data. You can iterate over the cursor to get the data from the database.

- [Projections](http://mongodb.github.io/node-mongodb-native/3.0/tutorials/projections/) are used to specify what you want back when query the database.

- [find](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#find)

- [cursor](http://mongodb.github.io/node-mongodb-native/3.0/api/Cursor.html)

Two common functions that you can use from the cursor are [forEach](http://mongodb.github.io/node-mongodb-native/3.0/api/Cursor.html#forEach) and [each](http://mongodb.github.io/node-mongodb-native/3.0/api/Cursor.html#each).

## Update

- [findOneAndUpdate](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#findOneAndUpdate) - An atomic operation that performs a lock on the database.

- [updateOne](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#updateOne) - Update the first document that matches the filter.

- [updateMany](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#updateMany) - Update multiple documents at once.

## Delete

- [deleteMany](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#deleteMany) - Delete all documents that match the filter.

- [deleteOne](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#deleteOne) - Delete the first document that matches the filter.
