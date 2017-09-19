# Ready Set Ball web-frontend

## Table of Contents
- [Install](#install)
- [Testing](#testing)
- [Serving the Project](#serving-the-project)
  - [React Development Server](#react-development-server)
  - [Express Development Server](#express-server)
- [Making a Component](#making-a-component)


## Install
1. Clone the project
`$ git clone https://git.linux.iastate.edu/309Fall2017/RB_B_5_Ready_Set_Ball.git`

2. Get dependencies
`$ npm install`

## Testing
Run:
`$ npm test`
Make sure all tests pass


## Serving the Project

The project can be served with either [React Development Server](#react-development-server) or [Express Server](#express-server). The react server is preferred for dev and the express is required for live

### React Development Server
Starts a react development server

Within the project, run
`$ npm start`
The server should start on http://localhost:3000

### Express Server
Starts an express server
1. Go to web_front/server/
`$ cd web_front`

Run the application as a node server, for example with node:
`$ node index.js`

or with `node-dev`
`$ node-dev index.js`

The server should start on http://localhost:9000

## Making a Component
To create a component using a template:

1. Go to the components directory
`$ cd web_front/src/components/`

2. There are two ways to use the `make-component script` to create components. 
    1. Run the `make-component script` with the name of the component to be created as an argument

      `$ python3 make-component.py MyComponent`
        This will create a component directory with the name MyComponent and the structure will look like this:

        ```
        |__MyComponent/
          |__index.js
          |__MyComponent.test.js
          |__style.css
        ```
    2. Run the `make-component script` without any arguments and follow the prompt. You can use this method to create UI components

      ```
      $ python3 make-component.py
      $ What is the name of the component you want to create?
      $ > Button
      $ Is Button going to be a UI Component? Type true or hit enter[false]
      $ > true
      $ UI Component: Button has been created
      ```

**Note:** This requires python3 installed
