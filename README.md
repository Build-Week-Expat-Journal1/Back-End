
# Expat Journal

> 


# Table of Contents
---

  - [Proposal](#proposal)
  - [Target Audience](#target-audience)
  - [Features](#features)
  - [Contributors To This Project](#contributors-to-this-project)
  - [Tech Stack Used](#contributors-to-this-project)
  - [Project Info](#project-info)
  - [Get Started With This Repo](#get-started-with-this-repo)
  - [Documentation](#documentation)

---
## Proposal

<!-- Add this later -->

## Target Audience

<!-- Add this later -->


## Features

<!-- add this later -->

[**Read Full Product Vision Document**] 
<!-- add this later this week -->

---
# Contributors To This Project
-Project Lead: [Ricardo Leite](https://github.com/ricardo-ljr)
- Marketing Page: [Melanie Chele](https://github.com/melaniechele)
- Front End Developer:[Anna Hangstefer](https://github.com/AHangstefer) &
- Front End Framework Developers = [Sarah Lawrence](https://github.com/SarahMLawrence) & 
- Database and API-[Jennifer Weiner](https://github.com/weinerjm14) & [Austin Healy](https://github.com/AustinJHealy)

# Tech Stack Use
*In This Repo*
1. Node.js
2. Express
3. Knex
4. nodemon
5. jsonwebtoken
6. sqlite3 in development
7. postgress in production

# Project Info
This project was done during a build week sprint at [Lambda School](https://lambdaschool.com). Part time students stretch this build over two weeks. They have 9 class nights of 3 hours to work on the project, complete stand up meetings before every day and at the end of specified days, and one timed, multiple-choice assessment for the unit they have just completed. Students work in cross-functional teams using GitHub, Trello, Slack, and Zoom to facilitate remote work.
## Build Sprint Mission
>Empower students to demonstrate unit mastery over their learning objectives.

# Get Started With This Repo

- [ ] Create a forked copy of this project.
- [ ] Clone your version of the repository in your terminal.
- [ ] Download project dependencies by running npm install.
- [ ] Start up the server using npm run server to use nodemon or npm start to use node only

# Documentation:

## Base URL for Deployed API
https://expat-journal-prod.herokuapp.com/


## Endpoints

### Users
| Request | URL              | Description                                      |
| ------- | ---------------- | ------------------------------------------------ |
| POST    | users/register   | register as a new user                           |
| POST    | users/login      | login as an existing user                        |
| PUT     | users/update/:id | update users information, requires authorization |
| DELETE  | users/delete/:id | delete the user, requires authorization          |

### Stories

All routes require authorization

| Request | URL                | Description                         |
| ------- | ------------------ | ----------------------------------- |
| GET     | stories/           | returns all stories in database     |
| GET     | stories/:id        | returns the story with that id      |
| GET     | stories/:username  | returns all stories from that user  |
| GET     | stories/:userid    | returns the story with that user_id |
| POST    | stories/add        | user can add a new story            |
| PUT     | stories/update/:id | update story with that id           |
| DELETE  | stories/delete/:id | delete the story with that id       |


# Table Requirements
# Users
| Name     | Type    | Required | Unique | Notes                     |
| -------- | ------- | -------- | ------ | ------------------------- |
| id       | integer | yes      | yes    | users id (auto generated) |
| username | string  | yes      | yes    | users username            |
| password | string  | yes      | no     | users password            |

# Stories
| Name       | Type     | Required | Unique | Notes                                    |
| id         | integer  | yes      | yes    | story id (auto generated)                |
| user-id    | integer  | yes      | yes    | references the id in the user table      |
| storyTitle | string   | no       | no     | title user gives to story                |
| storyAdded | datetime | yes      | no     | when the story was added or last updated |
| storyDate  | datetime | no       | no     | title user gives to story                |
| story      | string   | no       | yes    | title user gives to story(max 3000 char) |
| photo      | string   | no       | no     | image url                                |

### Users
​
```
{
  username: string, ***REQUIRED***
  password: string ***REQUIRED***  
}
```

### Stories
```
{
  user_id: integer, ***REQUIRED***  
  storyTitle: string,
  storyAdded: datetime, ***REQUIRED***  
  storyDate: datetime,
  story: string, ***REQUIRED***  
  photo: string (url)
}
```