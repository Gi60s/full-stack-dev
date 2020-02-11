---
title: Docker Introduction
toc: 1
---

# Virtual Machines

- A virtual machine is software that runs a guest operating system on top of your actual operating system.

- You specify the amount of RAM, the number of CPUs, hard drive space, etc.

- RAM and CPUs are reserved by the virtual machine so that the main operating system cannot use it.

<--

What is RAM?

--

It stands for Random Access Memory. It is the short term memory of your computer and is essential for fast processing. If you run low on RAM your computer slows down substantially.

-->

# Containers and Images

- A container is a set of processes that are isolated from the rest of the system. Acts very similar to a virtual machine.

- It uses as much RAM, CPU, and hard drive space as it needs to (no need to specify how much)

- It has very little overhead (it's light weight).

- Originally containers were only supported on Linux.

- Windows and Mac now have container support built in.

- An image is a static snapshot of a container.

# Docker

- A container management application.

- Makes container management consistent across operating systems.

- Does not run well on Windows if you have the Home edition. In this case you'll want to create a Linux VM.

## Terminology

- **Image** - A set of resources packaged together and ready to run. Image an operating system, files, and applications all ready to run.

- **Container** - An instance of an image. You can have running or stopped containers. Each container will take up space on your hard drive.

In later lesson's we'll talk Docker in depth, but for now we just need to know how to run prebuilt images.

## Sample Dockerfile

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

**Exercise**

1. Install Docker on your own machine: https://docs.docker.com/install/

2. Pull the [Docker Hub Hello World container](https://hub.docker.com/_/hello-world): `docker pull hello-world`

3. Run the Hello World container: `docker run --rm -it hello-world`

