# Task Manager

Hi humans,


This is a  hobby project that I created during the COVID-19 confinement period because I was bored.

This app is basically a lightweight project manager.<br>
User or users or teams can:
- sign up, sign in,
- create project
- create tasks for a project
- tasks are then classified on kanban created by the users
- tasks can be assigned amongs team members,
- tasks can be pulled from on stack (say open or in progress) => completed or in test
- many more cool features

## If you want to view the code, email me: fabrigeas@gmail.com and I will send you the gitlab link so you can clone the fronend and backends

The app can be customised and delivered as a SaaS.<br>

It is implemented in React frontend and [moleculerjs](https://moleculer.services/) (a microservice based node js backend framework)


## [Demo](http://54.93.50.24:3001/)

## Features include

- Authentication, authorisations
- Kanban
- Just try it. [here](http://54.93.50.24:3001/)

## To do and open tasks

Todos, issues and features to implement are already tracked in the app itself.<br>
feel free to add your tickets [here](http://54.93.50.24:3001/kanban/5ec0eb6449e76c15a3b3b660)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
tests are written using [enzymejs](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/instance.html) rather than the defdault <br>
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`

Builds and deploys both the frontend app and the backend app<br>
then deploys to AWS

## NOTE

Both the fronend and backend should be kept in such file tree<br>
for `npm run deploy` to work

path/to/project
  - backend/            <-- contains the cloned backend
  - frontend/           <-- contains this app
