---
title: The Cloud
toc: 1
---

# The Cloud

The cloud is simply someone else's computer.

--

When you run code, databases, or other services you are running them on a computer.

- Your laptop

- On Prem (on premises, in your own data center)

- In the cloud (AWS, Azure, Google Cloud, etc.)

==

# Cloud Service Provider Services

## AWS

- The biggest cloud computing company by far with the most services.

- Stands for *Amazon Web Service*.

- Provides some first-year free services and some always free services.

    https://aws.amazon.com/free/

--

### Google Cloud

- Not as many services as AWS.

- All components for an app are grouped together making it easier to manage entire projects.

- $300 credit for first year usage, some services always free

    https://cloud.google.com/free/

--

### Azure

- Microsoft's cloud offering

- Not as many services as AWS.

- Some free for a year, some free always

    https://azure.microsoft.com/en-us/free/

==

# Managing Your Applications

Managing and maintaining an application is more than just about your application code. You need to worry about:

- Vendor software
- Operating Systems
- Configurations
- Data storage
- Networks
- Security
- etc.

Where you decide to host these services and how will affect how much time and money you put into them.

--

### On Premises

- You buy the computers and upgrade the computer hardware.

- You keep the operating systems and applications up to date.

- You maintain security.

- You power the computers and are in charge of keeping them up.

- You maintain and control the network.

- You have full power to do whatever you want.

- This is very costly. The materials and the man (woman) hours required to maintain this is astronomical.

--

### IaaS

- Stands for *Infrastructure as a Service*

- The computers, the network, the power, and the location are maintained by someone else

- Usually has a lot of redundancy built in (fallback machines and event locations)

- You can configure the network, computers, etc. to fit your needs.

- You maintain the security and keep software up to date.

- This is much cheaper than running your own on premises data center, but it still costs a lot of man hours and is fairly expensive to maintain.

--

### PaaS

- Stands for *Platform as a Service*

- The computers, the network, the power, and the location are maintained by someone else

- The operating system, databases, and other service are maintained by someone else.

- You manage and maintain the software and the data.

- There is minimal work required by you to maintain these systems, meaning you can pay fewer people to maintain them. The cost of these services is generally more expensive, but the overall cost (subtracting your own man hours) makes using PaaS is less expensive.

--

### SaaS

- Everything is maintained by someone else.

- You use it.

--

The following table is a summary of what you need to maintain vs what is maintained by others in each environment. Everything marked with an `X` is maintained by you and everything marked with a `-` is maintained by someone else.

|                | On Prem | IaaS | PaaS | SaaS |
| -------------- | ------- | ---- | ---- | ---- |
| Applications   | X       | X    | X    | -    |
| Data           | X       | X    | X    | -    |
| Runtime        | X       | X    | -    | -    |
| Middleware     | X       | X    | -    | -    |
| O/S            | X       | X    | -    | -    |
| Virtualization | X       | -    | -    | -    |
| Servers        | X       | -    | -    | -    |
| Storage        | X       | -    | -    | -    |
| Networking     | X       | -    | -    | -    |
 




