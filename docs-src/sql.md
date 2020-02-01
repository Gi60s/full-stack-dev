---
title: SQL Databases
toc: 1
---

# SQL Databases

- Contain structured data.

- Each database has one or more tables.

- Each table has one or more rows.

- The type of content for each row is fixed by the columns.

- SQL databases let you use a *Structured Query Language* to get data into and out of the database.

- There are various flavors of SQL databases. For example, some are: MS SQL, Oracle SQL, MySQL, Postgres SQL.  

# Postgres

- A SQL database implementation.

- NPM Client Library: [pg](https://www.npmjs.com/package/pg)

- NPM Client Documentation: https://node-postgres.com/

## Connecting

- You can connect a single connection or a pool of connections.

- A pool will automatically add and remove connections based on usage. It also keeps several database connections active for incoming requests.

https://node-postgres.com/features/connecting

**Test Database Connection**

```js
client.query('SELECT NOW() as now')
  .then(res => {
    if (res.rows.length === 0) throw Error('Unable to connect to database')
  })
```

## Queries

- Use queries to request data from the database or to update the database.

- Queries need to watch for SQL injection. 

    ![XKCD Comic](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)
    
- Using a [query config object](https://node-postgres.com/features/queries#query-config-object) can make your code cleaner.

- You can also create prepared statements that have database performance benefits.

## Transactions

You you need to perform multiple queries together (all pass or all fail) then you want to use transactions.

https://node-postgres.com/features/transactions

# Docker Image

There is a Docker image for Postgres SQL: https://hub.docker.com/_/postgres

# Testing

When it comes to testing your database interactions there are several things you can test for.

- Test that you can successfully connect to the databases.

- Test that your queries work for both reading and writing.

<--

How do you test that you can write to your databases without actually messing up your data?

--

You have a few options:

1. Create a copy of your database, run tests against the copy.

2. Set up mocks and stubs to simulate a connection to your database.

-->
