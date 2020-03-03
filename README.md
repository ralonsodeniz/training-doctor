# Training Doctor App

## Info

Work in progress helper App conceived to help doctors to have access to the information they need in their day a day job.

## Technologies used

### Front-End

- [React](https://es.reactjs.org/) - JavaScript library for building user interfaces.
- [React Redux](https://react-redux.js.org/) - Predictable state container for JavaScript applications.
- [Redux Saga](https://redux-saga.js.org/) - Side effects management with redux integration.
- [React Router](https://reacttraining.com/react-router/) - Handle React single page applications routes.
- [React Redux Firestore](http://react-redux-firebase.com/) - Redux bindings for Firebase and Firestore.
- [Reselect](https://github.com/reduxjs/reselect) - Simple “selector” library for Redux using memoization.
- [Styled Components](https://styled-components.com/) - Utilising tagged template literals and the power of CSS, allows you to write actual CSS code to style your components.

### Back-End

- [Firebase](https://firebase.google.com/)
  - Firebase Auth to control user registration and authentication.
  - Firestore NoSQL Database.
  - Firebase Storage to store the users files.
  - Google Cloud Functions to execute on demand backend functions, like image and video conversion before storaging using sharp and ffmpeg libraries, under node.js enviorment.
