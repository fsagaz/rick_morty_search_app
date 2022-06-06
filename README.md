# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Available Scripts

for installing dependencies:

### `npm install`

for running the project:

### `npm start`


### CSS and templating

I have used Semantic Ui for the css templating. Originally my plan was to use it as a dependency via package but I get some errors and problems with
my version node ...finally I put it as css link on the html header pointing to the CDN where the mnified css is located

For rewritting some rules I have used css modules in sass for several components

### Files and components organization

- Entry point is `App.js` with routing setup for the app navigation

- `Layout.js` is the main component that contains `SearchBar.js` component where the main logic and methods of the App are defined

- `Characters` folder contains all the components used to show characted information retrieved from API (from list to details) 

- ui folder contains the defined ui elements created for app mainly 3: Card, Button and No results components.


