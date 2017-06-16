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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.$form = $('form');
    this.$searchInput = $('#input');
    this.$userCard = $('#card');
    this.$userInfoContainer = $('#user-info');
    this.$followersContainer = $('#user-followers');
    this.$loadMoreButton = $('.load-more');
    this.username;
    this.followerCount;
    this.getSearchValue();
  }

  // GET INPUT VALUE (USERNAME) ON ENTER


  _createClass(App, [{
    key: 'getSearchValue',
    value: function getSearchValue() {
      var that = this;

      this.$searchInput.keypress(function (event) {
        that.username = event.target.value; //username

        if (event.which == 13) {
          event.preventDefault();

          that.getUserData(that.username);

          that.getFollowers(that.username);

          that.activateLoadMoreButton(that.username);
        }
      });
    }

    // FETCH USER DATA FROM API AND CREATE USER CARD

  }, {
    key: 'getUserData',
    value: function getUserData(username) {
      var that = this;

      $.ajax({
        url: 'https://api.github.com/users/' + username,
        dataType: 'jsonp',
        success: function success(data) {
          // console.log(data);
          that.createUserCard(data);
        }
      });
    }

    // RENDER HTML OF USER INFO --> INSERT INTO DOM

  }, {
    key: 'createUserCard',
    value: function createUserCard(data) {
      var handle = data.data.login;
      this.followerCount = data.data.followers;

      var cardHTML = '\n        <div>Handle: ' + handle + '</div>\n        <div>Follower Count: ' + this.followerCount + '</div>\n      ';
      this.$userInfoContainer.empty();
      this.$userInfoContainer.append(cardHTML);
    }

    // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM

  }, {
    key: 'getFollowers',
    value: function getFollowers(username) {
      var _this = this;

      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var that = this;

      $.ajax({
        url: 'https://api.github.com/users/' + username + '/followers?per_page=40&page=' + count,
        dataType: 'jsonp',
        success: function success(data) {
          // console.log(this.followerCount);
          // console.log(data);
          var storedUsername = username;

          // Render a list of all the followers
          var listOfFollowers = that.createFollowersList(data);

          // If new username is passed, empty followers container
          if (storedUsername !== username) {
            _this.$followersContainer.empty();
          }

          // Append the list of followers into the followers container
          _this.$followersContainer.append(listOfFollowers);

          // If user has more than 40 followers, insert 'Load More' button
          if (_this.followerCount > 40) {
            _this.$loadMoreButton.addClass('is-visible');
          }
        }
      });
    }

    // RENDER HTML OF FOLLOWERS

  }, {
    key: 'createFollowersList',
    value: function createFollowersList(data) {
      console.log(data.data);

      return data.data.map(function (user) {
        var imageLink = user.avatar_url;
        var username = user.login;

        return '\n      <li>\n        <img src="' + imageLink + '">\n        <span>' + username + '</span>\n      </li>\n      ';
      }).join('');
    }

    // LOAD MORE FOLLOWERS WHEN 'LOAD MORE' BUTTON IS CLICKED

  }, {
    key: 'activateLoadMoreButton',
    value: function activateLoadMoreButton(username) {
      var that = this;
      var count = 1;

      this.$loadMoreButton.on('click', function (event) {
        event.preventDefault();
        count = count + 1;

        that.getFollowers(username, count);
      });
    }
  }]);

  return App;
}();

new App();

/***/ })
/******/ ]);