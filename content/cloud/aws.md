---
title: AWS
description: Amazon Web Services is a cloud provider that can run your website.
---

## The Cloud

The cloud is simply someone else's computer. When you run code, databases, or other services you are running them on a computer.

- Your laptop
- On Prem (on premises, in your own data center)
- In the cloud (AWS, Azure, Google Cloud, etc.)

## Cloud Service Provider Services

### AWS

- The biggest cloud computing company by far with the most services.
- Stands for *Amazon Web Service*.
- Provides some first-year free services and some always free services.
    https://aws.amazon.com/free/

### Google Cloud

- Not as many services as AWS.
- All components for an app are grouped together making it easier to manage entire projects.
- $300 credit for first year usage, some services always free
    https://cloud.google.com/free/

### Azure

- Microsoft's cloud offering
- Not as many services as AWS.
- Some free for a year, some free always
    https://azure.microsoft.com/en-us/free/

## Managing Your Applications

Managing and maintaining an application is more than just about your application code. You need to worry about:

- Vendor software
- Operating Systems
- Configurations
- Data storage
- Networks
- Security
- etc.

Where you decide to host these services and how will affect how much time and money you put into them.

### On Premises

- You buy the computers and upgrade the computer hardware.
- You keep the operating systems and applications up to date.
- You maintain security.
- You power the computers and are in charge of keeping them up.
- You maintain and control the network.
- You have full power to do whatever you want.
- This is very costly. The materials and the man (woman) hours required to maintain this is astronomical.

### IaaS

- Stands for *Infrastructure as a Service*
- The computers, the network, the power, and the location are maintained by someone else
- Usually has a lot of redundancy built in (fallback machines and event locations)
- You can configure the network, computers, etc. to fit your needs.
- You maintain the security and keep software up to date.
- This is much cheaper than running your own on premises data center, but it still costs a lot of man hours and is fairly expensive to maintain.
- With AWS this would be like running your own EC2 instances, load balancers, VPCs, gateways, database instances, configurations, etc.

### PaaS

- Stands for *Platform as a Service*
- The computers, the network, the power, and the location are maintained by someone else
- The operating system, databases, and other service are maintained by someone else.
- You manage and maintain the software and the data.
- There is minimal work required by you to maintain these systems, meaning you can pay fewer people to maintain them. The cost of these services is generally more expensive, but the overall cost (subtracting your own man hours) makes using PaaS is less expensive.
- With AWS this would be kind of like using automatic load balancing and preconfigured databases.

### SaaS

- Everything is maintained by someone else.
- You use it.
- You do have limitations on capabilities.
- With AWS this would be like API gateway, lambda (cloud functions), SNS, etc. 

### Comparison

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

## AWS Services

AWS provides many services that range from On-Prem to SAAS, allowing you to do what works for your products.

Some AWS services fall within a free tier, allowing you to use them without cost so long as you are within specific limits: https://aws.amazon.com/free

For those services that are not free, the cost depends on what you run and for how long you run it. You can use the AWS pricing calculator to calculate your expected costs: https://calculator.aws/
 
### AWS Lambda

A cloud function is a function that will run on demand in the cloud.

- May run based on events that occur.
- May run based on HTTP requests through a gateway.
- You have to accept that there will be cold start ups, but once warm it can handle many requests.
- Limit on how long a function can run. For example, 5 minutes. The process running the function may persist beyond this.
- Easy on-demand scaling.
- Can be very inexpensive.

Because it is on demand you only pay for what you use. If it's running all day every day then a cloud function is probably not a good choice.

Lambda is what AWS calls its cloud functions.

[Getting Started Guide](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)

[Video of AWS Lambda with NodeJS](https://www.youtube.com/watch?v=PEatXsXIkLc)

Here is an example lambda function. We'll see more about this when we talk about Terraform.

```js
exports.handler =  async function(event, context) {
  // run some code
}
```

### AWS Fargate

Fargate is AWS's docker solution. You build containers and AWS will deploy them. This includes auto scaling and self healing.

You can run your entire app within this, including a database, although running a database in docker is not recommended for production.

The cost of a fargate instance is a little high compared to other services.

### AWS EC2

EC2 is used for general computing. You can set up a server on it and ssh into the server and set it up however you'd like. Most EC2s will require some maintenance from you.

### AWS RDS

RDS is Amazon's relational database offering. They offer MySQL, Postgres, and a few other options. These are managed database instances and are maintained by AWS.



