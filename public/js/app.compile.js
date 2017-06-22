/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Import scss file for webpack to compile


__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    // REGISTER ELEMENTS
    this.$form = $('form');
    this.$searchInput = $('#input');
    this.$homeDisplay = $('#home-display');
    this.$userCard = $('#card');
    this.$userInfoContainer = $('#user-info');
    this.$followersContainer = $('#followers-container');
    this.$followersList = $('#user-followers');
    this.$loadButton = $('.load-more');
    this.followerCount;

    // Amount of followers to load each time
    this.loadAmount = 40;

    // NAVIGO ROUTING
    this.root = null;
    this.useHash = true;
    this.router = new Navigo(this.root, this.useHash);

    this.activateRouter();

    // ACTIVATE SEARCH FUNCTION
    this.getSearchValue();
  }

  // ROUTE HANDLER


  _createClass(App, [{
    key: 'activateRouter',
    value: function activateRouter() {
      var _this = this;

      // Route handler that executes callback function when route matches format of '/user/:id'
      this.router.on('username=:id', function (params, query) {

        var username = params.id;

        // Clear followers list & home display
        _this.$followersList.empty();
        _this.$homeDisplay.empty();

        // Add bottom border to 'user-info' container
        _this.$userInfoContainer.addClass('has-border-bottom');

        // Make Ajax call to get user data
        _this.getUserData(username);

        // Make Ajax call to get user's follower list
        _this.getFollowers(username);

        // Activate 'Load More' button
        _this.activateLoadButton(username);
      }).resolve();
    }

    // GET INPUT VALUE (USERNAME) ON ENTER

  }, {
    key: 'getSearchValue',
    value: function getSearchValue() {
      var _this2 = this;

      this.$searchInput.keypress(function (event) {
        // Get input value (username)
        var username = event.currentTarget.value;

        if (event.which == 13) {
          event.preventDefault();

          // Add routing to URL
          _this2.router.navigate('username=' + username);

          // Clear input field
          _this2.$searchInput.val('');
        }
      });
    }

    // FETCH USER DATA FROM API AND CREATE USER CARD

  }, {
    key: 'getUserData',
    value: function getUserData(username) {

      $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp',
        success: this.createUserCard.bind(this)
      });
    }

    // RENDER HTML OF USER INFO --> INSERT INTO DOM

  }, {
    key: 'createUserCard',
    value: function createUserCard(data) {
      this.followerCount = data.data.followers;
      var handle = data.data.login;
      var imageLink = data.data.avatar_url;
      var htmlLink = data.data.html_url;
      var notFound = data.data.message;
      var cardHTML = void 0;

      // Render HTML for user card
      if (notFound) {
        cardHTML = '<div id="search-fail">Sorry, that username does not exist.</div>';
      } else {
        cardHTML = '\n      <a href="' + htmlLink + '" target="_blank"><img src="' + imageLink + '"></a>\n      <div class="username">' + handle + '</div>\n      <div class="l-pad-top-4">\n        <h4 class="follower-title">Followers</h4>\n        <h3 class="follower-count l-pad-top-1">' + this.followerCount + '</h3>\n      </div>\n      ';
      }

      // For each new query, clear user info container and 'load more' button, then add new user info into container
      this.$userInfoContainer.empty();
      this.$loadButton.removeClass('is-visible');
      this.$userInfoContainer.append(cardHTML);
    }

    // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM

  }, {
    key: 'getFollowers',
    value: function getFollowers(username) {
      var _this3 = this;

      var pageCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var loadCount = arguments[2];


      $.ajax({
        url: 'https://api.github.com/users/' + username + '/followers?per_page=' + this.loadAmount + '&page=' + pageCount,
        dataType: 'jsonp',
        success: function success(data) {

          // Render a list of all the followers
          var listOfFollowers = _this3.createFollowersList(data);

          // Append the list of followers into the followers container
          _this3.$followersList.append(listOfFollowers);

          // If user has more than 30 followers, insert 'Load More' button
          if (_this3.followerCount > _this3.loadAmount) {
            _this3.$loadButton.addClass('is-visible');
          }

          // Remove button if all followers are loaded
          if (loadCount >= _this3.followerCount) {
            _this3.$loadButton.removeClass('is-visible');
          }
        }
      });
    }

    // RENDER HTML OF FOLLOWERS

  }, {
    key: 'createFollowersList',
    value: function createFollowersList(data) {

      return data.data.map(function (user) {
        var htmlLink = user.html_url;
        var imageLink = user.avatar_url;
        var username = user.login;

        // Render HTML for list of followers
        return '\n      <li>\n        <a href="' + htmlLink + '" target="_blank">\n          <div class="avatar-image">\n            <img src="' + imageLink + '">\n          </div>\n          <span>' + username + '</span>\n        </a>\n      </li>\n      ';
      }).join('');
    }

    // LOAD MORE FOLLOWERS WHEN 'LOAD MORE' BUTTON IS CLICKED

  }, {
    key: 'activateLoadButton',
    value: function activateLoadButton(username) {
      var _this4 = this;

      var count = 1;
      var loadCount = this.loadAmount; // Count for amount of followers loaded

      // Click handler - load more followers on button click
      this.$loadButton.on('click', function (event) {
        event.preventDefault();
        count += 1;
        loadCount += _this4.loadAmount;

        // Fetch more followers
        _this4.getFollowers(username, count, loadCount);
      });
    }
  }]);

  return App;
}();

new App();

/***/ })
/******/ ]);