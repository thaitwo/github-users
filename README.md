# GitHubers
> An application that allows users to search for GitHub users by username

[![GitHubers](https://raw.githubusercontent.com/thaitwo/github-users/master/public/assets/githubers-screenshot.png)](https://thaitwo.github.io/github-users)

### Demo

Check out the live [**demo**](https://thaitwo.github.io/github-users)


## Technologies Used

The following technologies were used to build this application.

* [jQuery](https://jquery.com/)
* [SCSS](http://sass-lang.com/)
* [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/)
* [Express](https://expressjs.com/)
* [Navigo](https://github.com/user/krasimir/navigo)
* [Animate.css](https://daneden.github.io/animate.css/)

## API Reference

The GitHub API was used for this application. To learn more about the GitHub API [click here](https://developer.github.com/v3/)

## Installations

In order to get this application running and compile changes, you will need to have the following npm packages installed:

#### Dependencies

* express
* navigo

#### Development Dependencies

* babel-core
* babel-loader
* babel-preset-es2015
* css-loader
* extract-text-webpack-plugin
* node-sass
* sass-loader
* style-loader
* webpack


To install all packages, go to the root folder in your command line and run:

```
npm install
```
Install just the dependencies:

```
npm install express navigo --save
```
Install the dev dependencies:

```
npm install webpack babel-core babel-loader babel-preset-es2015 css-loader node-sass sass-loader style-loader extract-text-webpack-plugin --save-dev
```

## Run App in Local Environment

To run the app locally, go to the root folder in the command line and run:

```
npm start
```

Then open a browser and type `localhost:8000` in the URL bar.

#### Compile Code

To compile the changes made in development, go to the root directory for this repository in the command line and run:

```
webpack --watch
```

## Testing
> Testing will use Selenium to open a new browser to run automated front-end tests

To run testing, you can install [Nightwatch](http://nightwatchjs.org/)

1. `npm install nightwatch --save-dev -g`
2. `npm run test`

## Deployment
**This application was deployed using GitHub.**

Assuming a repository exist for the application, you can deploy the application by taking the following actions:

* Go to your GitHub repository
* Click on **'Settings'** tab
* Scroll down to the **'GitHub Pages'** section
* Selected **'master branch'** from the dropdown menu
* Click save button

## Author Info
Created by [Thai Tu](http://www.thaitwo.com/)


## Future Implementations
Possible future implementations to the application:

> Search suggestions of usernames