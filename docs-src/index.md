---
title: Home 
navOrder: history domain-driven-design git rest javascript node-and-npm express testing-intro testing-nodejs async-javascript events docker-part-1 docker-part-2 sql nosql session-management html-css browser-events vue vue-cli vue-components vue-router nuxt vuex css-pre-processors 
toc: 1
---

# Introduction

In this class we will learn how to do full stack development.

As technology continues to evolve at an ever quickening pace it is becoming increasingly more difficult to be a full stack developer.

Through this class we will develop a full stack application, but how much we cover and what will be determined based on what you want to learn and how much we can tackle together.

Each class will consist of time spent in instruction followed by time spent for lab work. Lab work is an opportunity to work through assignments in class and to talk through assignments submitted in class.

# You are Qualified

We each have different backgrounds, different educations, and different levels of experiences in all aspects of life.

Your range of experiences uniquely qualify you to see solutions that others may not.

You are not an impostor here. You belong.

# About this Class

## What will this class cover?

This class will cover how to:

- Create a dynamic web app within the client (browser)
- Create a custom server on NodeJS
- Manage user sessions
- Communicate with databases and understand at the basic level how to organize them
- Write tests for your code
- Package your code into micro services

## About the Instructor

- **Name:** James Speirs

- **Education:**

    - Bachelors of Science at BYU in Information Technology with an emphasis in User Interface Design.
    
    - Masters of Science at BYU in Information Technology with an emphasis in User Experience.

- **Work:**

    - Currently working for BYU's Office of Information Technology as an architect and engineering manager.

- **Office Hours**

    - I don't have an office or set hours, but if you need some one on one time we can set up a time to meet.
    
    - I plan to have free time at the end of every class to answer questions too.
    
    - I am also available on the IT&C Slack (byuitcrowd.slack.com) and can answer questions there.
    
# Homework

Homework assignments will be posted to [Learning Suite](https://learningsuite.byu.edu).

Homework will be due in class and by the end of class (6:50 PM).

When it comes to answering questions about homework vs passing off assignments, those who need a pass off will take first priority.

Late assignments will loose 5% per class late (not per day late) up to 50%.

Most homework assignments will be toward building the final project and will build one upon another. Falling behind will compound difficulties.

# Final Project

- You will build throughout the semester a final project of your choosing.

- You may choose to build your Final Project while we work in class on our in class application. The two will use a lot of the same technology.

- Worth about 25% of your final grade.

## Requirements

Build a full stack (client and server) web application using [JavaScript](javascript.md) and [NodeJS](node-and-npm.md).

**Client (browser)**

- Client application must be built on [Vue](vue.md). Using [Nuxt](nuxt.md) is acceptable because it is built on Vue.

- A single page app. Although the look of the screen and the URL may change, it should never load the whole page after the first page load.

- Use Vue/Nuxt.

- Allow the user to provide input to your application.

- Content must be catered to the user.
    
**Server**

- Write a custom server using [NodeJS](node-and-npm.md).

- Use either a [NoSQL](nosql.md) or [SQL](sql.md) database (or both).

- Users must be able to create and use a login.

- Must manage user sessions.

- Users must be able to provide input and have a dynamic experience.

**Environment**

- Must use docker containers for local development, including it's own containerized database. It must be easy to transfer your app from one computer to another for development work.

- It must provide a way via environment variables or other configuration settings to let your app run in multiple environments. For example, develop locally but deploy to the cloud.

## Alone or with a Group

- You can work alone or in pairs.

- If you have two people working on the project then more will be expected of your final project. I will also expect and look for an equal amount of contribution from each person.

## Grading Criteria

The grade for your final project is based on a presentation that will occur on one of the last two days of class. There is no extra credit for presenting the first day. If any team fails to present they will receive a 0% on their final project.

The presentation should include a demonstration of the web application as well as some code examples. The following criteria will be used to grade your final project.

- **Attendance (5%)** - You must be there both days (one day to present, the other to see presentations).

- **Database Usage (10%)** - You must have your own database for storing data and your web application should read from and write to that database. (Show some code.)

- **REST API (15%)** - You must have several REST endpoints for sending data to the server and getting data back from the server. (Show some code.)

- **Single Page Application (15%)** - You're application should have the ability to navigate without reloading the page. You need to have at least three views (more if you have a team). (Show through demonstration.)

- **Session Management (15%)** - Users must be able to log into your system and remain logged in while navigating the site and during page reloads. Logout must also be available. (Show through demonstration.)

- **Polish (5%)** - I don't expect you to be a UI or UX expert, but I do expect the front end application to make sense and be usable without special instruction. (Show through demonstration.)

- **Project Scope (15%)** - Don't make your project too small. If you have questions about what is too small be sure to ask me. (Show through demonstration.)

- **Environment (15%)** - You application needs to use Docker Compose so that it can be easily run from any computer that has container management capabilities. It also must accept a configuration to enable it to be deployed to other servers or even the cloud.

- **Reward and Challenge (5%)** - Share with the class what the most rewarding part of the project was as well as the most challenging.

## Example Final Projects from the Past

- A calendar application that helps multiple users schedule on their own calendars or on a shared calendar.

- A recipe website where recipes can be submitted, categorized, searched by ingredients available, etc.

- A D&D tracking website.

- A puzzle video game.

- A project management application that tracks tasks across users and allows for team communication (posts, comments).

- An app to help manage a church calling.

- A photography application for uploading, categorizing, and searching photos.
