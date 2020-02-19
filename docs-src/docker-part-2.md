---
title: Docker (Part 2)
toc: 1
---

# Containers, What and Why

Whenever you write code you want to have a consistent environment:

- Same operating system

- Same configurations

- Same dependencies

Within Node we establish a consistent code base by using NPM. The `package.json` and `package-lock.json` files allow node dependencies to be installed in a consistent manner.

Node is a very small part of your application.

Containers

- Allow you to encapsulate the system that surrounds your application.

- Behave similar to virtual machines.

- Are isolated from the parent operating system.

- Provide a consistent environment.

Services like [Kubernetes](https://kubernetes.io/) can take containers and deploy them to the cloud, ensure their availability, and scale them appropriately.

# Docker

[Docker](https://www.docker.com/) is a container management solution. 

- It makes it easy to create and use containers.

- It has a repository of existing published containers.

- It provides a consistent interface for the parent operating system (Windows, Mac OS, and Linux).

## Docker Help

- General help, run the command: `docker`

- Command specific help: `docker <cmd> --help` (for example: `docker run --help`)

# Creating Our Own Image

1. We need to select a base image. Lets choose `node:latest`, a [NodeJS image](https://hub.docker.com/_/node) published into the Docker repository.

2. Create a `Dockerfile` with this content:

    ```bash
    # Base the image off of the NodeJS image
    FROM node

    # Start the container with a bash terminal ready
    ENTRYPOINT ["/bin/bash"]
    ```

    [Dockerfile Documentation](https://docs.docker.com/engine/reference/builder/)

3. Build the docker image: `docker build -t my-image .`

4. Run the image: `docker run -it --rm my-image`

5. Because we used the `-i` and `-t` flag (we joined it into one with `-it`) we are now looking at the terminal inside the container.

6. Navigate to the home directory: `cd ~`

7. Get the path to the current directory: `pwd`

8. List what files are in the home directory: `ls`

## Add Files to the Image

Next we're going to add a file to our Docker container.

1. Exit the container: `exit`

2. Create a node JavaScript file `index.js` that echoes `"Hello World"` to the console.

3. Modify the `Dockerfile` to copy the file into the image.

    ```bash
    # Base the image off of the NodeJS image
    FROM node
    
    # Set the working directory to be the HOME directory
    WORKDIR /root

    # Copy our application files to the image
    COPY ./ /root

    # Start the container running our Node app
    CMD ["node", "index"]
    ```

5. Rebuild the image: `docker build -t my-image .`

6. Run the container again: `docker run -it --rm my-image`

You should see the Node app run, and exit.

## Update Image Files

Make a modification:

- Now modify the `index.js` to output something else.

- Run the container again: `docker run -it --rm my-image`

<--

Why did it output our old content instead of the new content?

--

We built the content (the `index.js` file) into the image, so it still has the old code. We need to rebuild: `docker build -t my-image .`

-->

An alternative to rebuilding the image every time is to replace files in the image when the container runs. This is done through **volume mounts**.

A volume mount:

- Maps the content in a directory on your computer to a directory in the container.

- Overwrites the files that were at the mounted location in the image while the container runs. This does not affect the images files.

- By default allows both your computer and the container to modify files.

**Example:**  `docker run -it --rm -v $PWD:/root my-image`.

In the end you will want to rebuild the image and you can use the built image for production deployments.

<--

What does using images and containers do for us?

--

We get a consistent environment for both development and production. You might be running Windows, but your image will run a Linux server. Your computer may have one set of configurations and drivers, but the image has another.

The key is the consistent environment.

-->

# Create a Server

We're going to build a simple server to run on Docker.

1. On your project directory run `npm init`

2. Install the `express` dependency: `npm install express`

2. Create a directory called `server`.

3. Inside that directory create the `index.js` file:

    ```js
    const express = require('express')
    const app = express()
    
    app.get('*', (req, res) => {
      res.send('Hello, World!')
    })
    
    app.listen(3000, err => {
      if (err) return console.error(err.stack)
      console.log('Server listening on port 3000')
    })
    ```

Now you can start and test this server locally:

1. Run `node server/index.js`

2. Open a browser to http://localhost:3000

## Create a Docker Image for the Server

Below is a Dockerfile slightly modified from above to house our server. We're going to use this to build a new image for our server.

1. Create at the root directory a `Dockerfile` with this content:

    ```bash
    # Base the image off of the NodeJS image
    FROM node
    
    # Set the working directory to be the HOME directory
    WORKDIR /root
    
    # Copy our application files to the image
    COPY ./server /root
    
    # Start the container running our Node app
    CMD ["node", "index"]
    ```

2. Build the new image: `docker built -t my-server .`

3. Start the container: `docker run -it --rm my-server`

<--

What is the output? What do we need to change to fix this?

--

We're missing our `express` dependency. We need to include our `package.json` and `package-lock.json` but not our `node_modules` directory.

We also need to update our image to install the NPM dependencies.

-->

1. Update the `Dockerfile`:

    ```bash
    # Base the image off of the NodeJS image
    FROM node
    
    # Set the working directory to be the HOME directory
    WORKDIR /root
    
    # Install NPM dependencies early in the build process
    COPY ./package.json /root
    COPY ./package-lock.json /root
    RUN npm install
    
    # Copy our application files to the image
    COPY ./server /root/server
    
    # Start the container running our Node app
    CMD ["node", "server/index"]
    ```
   
2. Build the new image: `docker built -t my-server .`

3. Start the container: `docker run -it --rm my-server`

<--

Why do we install NPM dependencies early in the build process?

--

When an image is built it caches the layers. Each Docker command (`FROM`, `COPY`, `RUN`, etc.) is cached.

If we copied over our app files before the `npm install` then the `npm install` has to happen every time we build because the layers beneath it have changed.

By having the `npm install` before we copy our application over we can use the cached layer of the `npm install`, greatly reducing build time.

-->

## Opening Ports

If your container is running a server of some sort then to communicate with the server you'll need access to the port within the container.

1. Update your `Dockerfile`:

    ```bash
    # Base the image off of the NodeJS image
    FROM node
    
    # Set the working directory to be the HOME directory
    WORKDIR /root
    
    # Install NPM dependencies early in the build process
    COPY ./package.json /root
    COPY ./package-lock.json /root
    RUN npm install
   
    # Specify what port will be available - necessary for VPC network
    EXPOSE 3000
    
    # Copy our application files to the image
    COPY ./server /root/server
    
    # Start the container running our Node app
    CMD ["node", "server/index"]
    ```
   
2. Build the new image: `docker built -t my-server .`

3. Start the container with a port mapping: `docker run -it --rm -p 8000:3000 my-server`

4. Open a web browser to the port on your computer that maps to the container's server's port: http://localhost:8000

The port in the example above was mapped to `8000` on your machine, but it could be any available port, including the same port as is used internally on the server too, port `3000`.

# Docker Compose

- Is installed when you install Docker.

- Makes it so that you don't have to retype the flags when you use `docker run`.

- Helps you to orchestrate multiple containers working together.

- Creates a Virtual Private Cloud, a network where containers can communicate with each other freely.

## Commands

- `docker-compose build` - Build the containers.

- `docker-compose up` - Start the containers (can use with `--build` to also build before starting).

- `docker-compose down` - Stop the containers

# Samples

## Dockerfile

Below is a sample Dockerfile if you'd like to create your own.

```dockerfile
  # Every Dockerfile must start with a "FROM" keyword and you have to specify a base image (local or pull/reference one from dockerhub)
FROM base_image:version

  # Use WORKDIR to specify that all subsequent actions should be taken from the directory
  # (e.g. /usr/src/app) in your image's filesystem (never the host’s filesystem).
WORKDIR /the/workdir/path

  # Use COPY to copy files from your host to the present location (.) in your image 
  # e.g. "COPY package.json ." and the "." would translate to your specified WORKDIR above (/usr/src/app/package.json) 
  # e.g. "COPY . ." copies all of the source code from the host to the image's filesystem.
COPY source dest

  # Commands for this container/image to run
  # e.g.: 
  # RUN apt update && \
  #     apt install curl && \
  #     apt install git
RUN command

  # Use CMD to specify some metadata in the image that describes how to run the container based off of this image. 
  # e.g. ["npm", "start"] would run "npm start"
CMD [ "executable" ]

  # Use the ENV instruction if you want to set the environment variable <key> to the value <value>. 
  # This value will be in the environment for all subsequent instructions in the build stage
  # and can be replaced inline in many as well.
ENV key=value other_key=other_value another_key=another_value

  # Use the ADD instruction if you want to copy new files, directories or remote file URLs from <src>
  # and add them to the filesystem of the image at the path <dest>.
  # The <dest> is an absolute path, or a path relative to WORKDIR, into which the source will be copied inside the destination container.
ADD source dest
```

## Docker Compose

```yml
version: '3.1'

services:

  # mongo database instance
  mongo:
    image: mongo:4
    restart: always
    env_file:
      - ./.env

  # web server
  web:
    # build an image using the Dockerfile in the current directory
    build:
      context: .

    # map external port 8000 to internal port 3000
    ports:
      - 8000:3000

    # creating a volume mount is nice for development
    volumes:
      - ./server:/root/server

    # give the location for the environment file
    env_file:
      - ./.env

    # tell this container not to start until the mongo container starts
    depends_on:
      - mongo
```

<--

How to `Dockerfile` and `docker-compose.yml` files work together?

--

A `Dockerfile` is instructions to build a single image. A `docker-compose` file tells how compose and run multiple docker containers (from images) together.

-->
