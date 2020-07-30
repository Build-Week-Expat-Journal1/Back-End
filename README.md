
# Expat Journal

>Giving you a place to store, organize, and show off pictures and stories of your expat adventures.


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

Provides somewhere to keep photos and stories of where you’ve been, what you saw, what you did in an organized manner

## Target Audience

Expats, people who want to become expats, others who want to organize their adventures


## Features

### What features are required for your minimum viable product?
1. A user can visit site and see photos laid out in a grid
2. A user can create, read, update, and delete stories and photos. (No ability to upload one's own photos for MVP)

### What features may you wish to put in a future release?
1. Comment box where others can comment on the pictures
2. Post videos
3. Create a filter for tags/categories
4. Upload a picture and add geolocation meta-data from picture or assign location of where it was taken



[**Read Full Product Vision Document**](./files/Copy%20of%20Expat%20Journal%20PVD.pdf)

---
# Contributors To This Project
- Project Lead: [Ricardo Leite](https://github.com/ricardo-ljr)
- Marketing Page: [Melanie Chele](https://github.com/melaniechele)
- Front End Developer:[Anna Hangstefer](https://github.com/AHangstefer) & [E Jonathan Munoz](https://github.com/Johnjohnn)
- Front End Framework Developers: [Sarah Lawrence](https://github.com/SarahMLawrence) & [Austin Healy](https://github.com/AustinJHealy)
- Database and API: [Jennifer Weiner](https://github.com/weinerjm14) 
  

# Tech Stack Use
*In This Repo*
1. Node.js
2. Express
3. Knex
4. nodemon
5. jsonwebtoken
6. sqlite3 for development and testing
7. postgres in production
8. Jest and supertest

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
https://expat-journal-prod.herokuapp.com


## Endpoints

### Users
| Request | URL               | Description                                      |
| ------- | ----------------- | ------------------------------------------------ |
| GET     | /users            | list all users, requires authorization           |
| GET     | /users/:id        | get user by their id, requires authorization     |
| POST    | /users/register   | register as a new user                           |
| POST    | /users/login      | login as an existing user                        |
| PUT     | /users/update/:id | update users information, requires authorization |
| DELETE  | /users/delete/:id | delete the user, requires authorization          |

### Stories

All routes require authorization

| Request | URL                   | Description                                                         |
| ------- | --------------------- | ------------------------------------------------------------------- |
| GET     | /stories              | returns all stories in database                                     |
| GET     | /stories/:id          | returns the story with that id                                      |
| GET     | /stories/username/:id | returns all stories for that username (use the username at the :id) |
| GET     | /stories/userid/:id   | returns the story with that user_id                                 |
| POST    | /stories/add          | user can add a new story                                            |
| PUT     | /stories/update/:id   | update story with that id                                           |
| DELETE  | /stories/delete/:id   | delete the story with that id                                       |


# Table Requirements
# Users
| Name     | Type    | Required | Unique | Notes                     |
| -------- | ------- | -------- | ------ | ------------------------- |
| id       | integer | yes      | yes    | users id (auto generated) |
| username | string  | yes      | yes    | users username            |
| password | string  | yes      | no     | users password            |

# Stories
| Name       | Type    | Required | Unique | Notes                                    |
| ---------- | ------- | -------- | ------ | ---------------------------------------- |
| id         | integer | yes      | yes    | story id (auto generated)                |
| user_id    | integer | yes      | yes    | references the id in the user table      |
| storyTitle | string  | no       | no     | title user gives to story                |
| storyAdded | string  | yes      | no     | when the story was added or last updated |
| storyDate  | string  | no       | no     | title user gives to story                |
| story      | string  | yes      | no     | the users story (max 3000 char)          |
| img        | string  | no       | no     | image url                                |

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
  storyAdded: string, ***REQUIRED***  
  storyDate: string,
  story: string, ***REQUIRED***  
  img: string (url)
}
```