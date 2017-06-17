# GitHubers
> An application that allows users to search for GitHub users by username

[![GitHubers](https://raw.githubusercontent.com/thaitwo/github-users/master/public/assets/githubers-screenshot.png)](https://thaitwo.github.io/github-users)

### Demo

Check out the live [**demo**](https://thaitwo.github.io/github-users)


## Technologies Used

The following technologies were used to buid this application. No frameworks were required in the process due to the small scale and simplicity of this application.

* [jQuery](https://jquery.com/)
* [SCSS](http://sass-lang.com/)
* [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/)
* [Animate.css](https://daneden.github.io/animate.css/)



## Development Installations
In order to get this application running, you will need to install the following development dependencies:

* babel-core
* babel-loader
* babel-preset-es2015
* css-loader
* extract-text-webpack-plugin
* node-sass
* sass-loader
* style-loader
* webpack

Feel free to copy and paste the code below into your command line to install the dependencies.

```
npm install webpack babel-core babel-loader babel-preset-es2015 css-loader node-sass sass-loader style-loader extract-text-webpack-plugin --save-dev
```

## API Reference

GitHub API was used for this application. To learn more about the GitHub API [click here](https://developer.github.com/v3/)

## Run App in Local Environment

To run the app locally, simply go to your root directory via your desktop and double click on the **index.html** file. This should open a window on your browser displaying the app webpage.

To compile the changes made in development, go to the root directory for this repos in the command line and type in the following:

```
webpack --watch
```

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