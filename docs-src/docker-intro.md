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

**Exercise**

1. Install Docker on your own machine: https://docs.docker.com/install/

2. Pull the [Docker Hub Hello World container](https://hub.docker.com/_/hello-world): `docker pull hello-world`

3. Run the Hello World container: `docker run --rm -it hello-world`

