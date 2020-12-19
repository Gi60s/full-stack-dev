---
title: Containers
description: Containers are a technology that helps you to build a consistent environment for your code.
---

## Virtual Machines

- A virtual machine is software that runs a guest operating system on top of your actual operating system.
- You specify the amount of RAM, the number of CPUs, hard drive space, etc.
- RAM and CPUs are reserved by the virtual machine so that the main operating system cannot use it.

<question-answer q="What is RAM?">

It stands for Random Access Memory. It is the short term memory of your computer and is essential for fast processing. If you run low on RAM your computer slows down substantially.

</question-answer>

## Containers and Images

Containers are a technology that allows you to encapsulate code, libraries, configuration, and operating systems into a single image. When you execute that image it creates a running container.

- A container is a set of processes that are isolated from the rest of the system. Acts very similar to a virtual machine.
- It uses as much RAM, CPU, and hard drive space as it needs to (no need to specify how much)
- It has very little overhead (it's light weight).
- An image is used to create a running container.

## Why Use Containers

Whenever you write code you want to have a consistent environment on your machine, other developer machines, and especially on the server. This includes:

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