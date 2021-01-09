---
title: SQL Databases
description: SQL databases using PostgreSQL.
---

SQL Databases

- Contain structured data.
- Each database has one or more tables.
- Each table has one or more rows.
- The type of content for each row is fixed by the columns.
- SQL databases let you use a *Structured Query Language* to get data into and out of the database.
- There are various flavors of SQL databases. For example, some are: MS SQL, Oracle SQL, MySQL, Postgres SQL.  

## Postgres

- A SQL database implementation.
- NPM Client Library: [pg](https://www.npmjs.com/package/pg)
- NPM Client Documentation: https://node-postgres.com/

### Connecting

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

### Queries

- Use queries to request data from the database or to update the database.
- Queries need to watch for SQL injection.
  ![XKCD Comic](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)
- Using a [query config object](https://node-postgres.com/features/queries#query-config-object) can make your code cleaner.
- You can also create prepared statements that have database performance benefits.

### Transactions

You you need to perform multiple queries together (all pass or all fail) then you want to use transactions.

https://node-postgres.com/features/transactions

## Sample Docker Setup

There is a Docker image for Postgres SQL: https://hub.docker.com/_/postgres

A database in a container works great for local development but is not recommended for production running code.

1. Create a directory called `docker` and in that another directory called `db`.
2. Create an `init.sql` file in that directory that create's your tables. For example:
  ```sql
  --  Define accounts table
  CREATE TABLE "accounts" (
    "id" character(32) NOT NULL,
    "username" character varying(40) NOT NULL,
    "password" character varying(80) NOT NULL,
    PRIMARY KEY ("id")
  );
  CREATE INDEX "accounts_username" ON "accounts" ("username");

  -- Replicate database into a test database
  CREATE DATABASE test WITH TEMPLATE <YOUR_DATABASE_NAME>;
  ```

3. create a file named `Dockerfile` that looks something like this:
  ```
  FROM postgres:12-alpine

  # copy initialization script over to initialize database
  COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
  ```
4. At the root of your project create a `docker-compose.yml` file that looks something like this:
  ```yml
  version: "3.8"

  services:

    adminer:
      image: adminer
      restart: always
      ports:
        - 8080:8080

    db:
      build:
        context: ./docker/db
      restart: always
      env_file: ./.env
      environment:
        POSTGRES_DB: ${DB_NAME}
        POSTGRES_USER: ${DB_USER}
        POSTGRES_PASSWORD: ${DB_PASS}
      ports:
        - ${DB_PORT}:5432
  ```