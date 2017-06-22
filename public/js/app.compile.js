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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Navigo", [], factory);
	else if(typeof exports === 'object')
		exports["Navigo"] = factory();
	else
		root["Navigo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function isPushStateAvailable() {
	  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
	}
	
	function Navigo(r, useHash, hash) {
	  this.root = null;
	  this._routes = [];
	  this._useHash = useHash;
	  this._hash = typeof hash === 'undefined' ? '#' : hash;
	  this._paused = false;
	  this._destroyed = false;
	  this._lastRouteResolved = null;
	  this._notFoundHandler = null;
	  this._defaultHandler = null;
	  this._usePushState = !useHash && isPushStateAvailable();
	  this._onLocationChange = this._onLocationChange.bind(this);
	  this._genericHooks = null;
	
	  if (r) {
	    this.root = useHash ? r.replace(/\/$/, '/' + this._hash) : r.replace(/\/$/, '');
	  } else if (useHash) {
	    this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
	  }
	
	  this._listen();
	  this.updatePageLinks();
	}
	
	function clean(s) {
	  if (s instanceof RegExp) return s;
	  return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
	}
	
	function regExpResultToParams(match, names) {
	  if (names.length === 0) return null;
	  if (!match) return null;
	  return match.slice(1, match.length).reduce(function (params, value, index) {
	    if (params === null) params = {};
	    params[names[index]] = decodeURIComponent(value);
	    return params;
	  }, null);
	}
	
	function replaceDynamicURLParts(route) {
	  var paramNames = [],
	      regexp;
	
	  if (route instanceof RegExp) {
	    regexp = route;
	  } else {
	    regexp = new RegExp(route.replace(Navigo.PARAMETER_REGEXP, function (full, dots, name) {
	      paramNames.push(name);
	      return Navigo.REPLACE_VARIABLE_REGEXP;
	    }).replace(Navigo.WILDCARD_REGEXP, Navigo.REPLACE_WILDCARD) + Navigo.FOLLOWED_BY_SLASH_REGEXP, Navigo.MATCH_REGEXP_FLAGS);
	  }
	  return { regexp: regexp, paramNames: paramNames };
	}
	
	function getUrlDepth(url) {
	  return url.replace(/\/$/, '').split('/').length;
	}
	
	function compareUrlDepth(urlA, urlB) {
	  return getUrlDepth(urlB) - getUrlDepth(urlA);
	}
	
	function findMatchedRoutes(url) {
	  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	  return routes.map(function (route) {
	    var _replaceDynamicURLPar = replaceDynamicURLParts(clean(route.route)),
	        regexp = _replaceDynamicURLPar.regexp,
	        paramNames = _replaceDynamicURLPar.paramNames;
	
	    var match = url.replace(/^\/+/, '/').match(regexp);
	    var params = regExpResultToParams(match, paramNames);
	
	    return match ? { match: match, route: route, params: params } : false;
	  }).filter(function (m) {
	    return m;
	  });
	}
	
	function match(url, routes) {
	  return findMatchedRoutes(url, routes)[0] || false;
	}
	
	function root(url, routes) {
	  var matched = routes.map(function (route) {
	    return route.route === '' || route.route === '*' ? url : url.split(new RegExp(route.route + '($|\/)'))[0];
	  });
	  var fallbackURL = clean(url);
	
	  if (matched.length > 1) {
	    return matched.reduce(function (result, url) {
	      if (result.length > url.length) result = url;
	      return result;
	    }, matched[0]);
	  } else if (matched.length === 1) {
	    return matched[0];
	  }
	  return fallbackURL;
	}
	
	function isHashChangeAPIAvailable() {
	  return !!(typeof window !== 'undefined' && 'onhashchange' in window);
	}
	
	function extractGETParameters(url) {
	  return url.split(/\?(.*)?$/).slice(1).join('');
	}
	
	function getOnlyURL(url, useHash, hash) {
	  var onlyURL = url.split(/\?(.*)?$/)[0],
	      split;
	
	  if (typeof hash === 'undefined') {
	    // To preserve BC
	    hash = '#';
	  }
	
	  if (isPushStateAvailable() && !useHash) {
	    onlyURL = onlyURL.split(hash)[0];
	  } else {
	    split = onlyURL.split(hash);
	    onlyURL = split.length > 1 ? onlyURL.split(hash)[1] : split[0];
	  }
	
	  return onlyURL;
	}
	
	function manageHooks(handler, hooks, params) {
	  if (hooks && (typeof hooks === 'undefined' ? 'undefined' : _typeof(hooks)) === 'object') {
	    if (hooks.before) {
	      hooks.before(function () {
	        var shouldRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        if (!shouldRoute) return;
	        handler();
	        hooks.after && hooks.after(params);
	      }, params);
	    } else if (hooks.after) {
	      handler();
	      hooks.after && hooks.after(params);
	    }
	    return;
	  }
	  handler();
	};
	
	function isHashedRoot(url, useHash, hash) {
	  if (isPushStateAvailable() && !useHash) {
	    return false;
	  }
	
	  if (!url.match(hash)) {
	    return false;
	  }
	
	  var split = url.split(hash);
	
	  if (split.length < 2 || split[1] === '') {
	    return true;
	  }
	
	  return false;
	};
	
	Navigo.prototype = {
	  helpers: {
	    match: match,
	    root: root,
	    clean: clean
	  },
	  navigate: function navigate(path, absolute) {
	    var to;
	
	    path = path || '';
	    if (this._usePushState) {
	      to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
	      to = to.replace(/([^:])(\/{2,})/g, '$1/');
	      history[this._paused ? 'replaceState' : 'pushState']({}, '', to);
	      this.resolve();
	    } else if (typeof window !== 'undefined') {
	      path = path.replace(new RegExp('^' + this._hash), '');
	      window.location.href = window.location.href.replace(/#$/, '').replace(new RegExp(this._hash + '.*$'), '') + this._hash + path;
	    }
	    return this;
	  },
	  on: function on() {
	    var _this = this;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (typeof args[0] === 'function') {
	      this._defaultHandler = { handler: args[0], hooks: args[1] };
	    } else if (args.length >= 2) {
	      if (args[0] === '/') {
	        var func = args[1];
	
	        if (_typeof(args[1]) === 'object') {
	          func = args[1].uses;
	        }
	
	        this._defaultHandler = { handler: func, hooks: args[2] };
	      } else {
	        this._add(args[0], args[1], args[2]);
	      }
	    } else if (_typeof(args[0]) === 'object') {
	      var orderedRoutes = Object.keys(args[0]).sort(compareUrlDepth);
	
	      orderedRoutes.forEach(function (route) {
	        _this.on(route, args[0][route]);
	      });
	    }
	    return this;
	  },
	  off: function off(handler) {
	    if (this._defaultHandler !== null && handler === this._defaultHandler.handler) {
	      this._defaultHandler = null;
	    } else if (this._notFoundHandler !== null && handler === this._notFoundHandler.handler) {
	      this._notFoundHandler = null;
	    }
	    this._routes = this._routes.reduce(function (result, r) {
	      if (r.handler !== handler) result.push(r);
	      return result;
	    }, []);
	    return this;
	  },
	  notFound: function notFound(handler, hooks) {
	    this._notFoundHandler = { handler: handler, hooks: hooks };
	    return this;
	  },
	  resolve: function resolve(current) {
	    var _this2 = this;
	
	    var handler, m;
	    var url = (current || this._cLoc()).replace(this._getRoot(), '');
	
	    if (this._useHash) {
	      url = url.replace(new RegExp('^\/' + this._hash), '/');
	    }
	
	    var GETParameters = extractGETParameters(current || this._cLoc());
	    var onlyURL = getOnlyURL(url, this._useHash, this._hash);
	
	    if (this._paused) return false;
	
	    if (this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
	      if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
	        this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
	      }
	      return false;
	    }
	
	    m = match(onlyURL, this._routes);
	
	    if (m) {
	      this._callLeave();
	      this._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: m.route.hooks, params: m.params };
	      handler = m.route.handler;
	      manageHooks(function () {
	        manageHooks(function () {
	          m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params, GETParameters);
	        }, m.route.hooks, m.params, _this2._genericHooks);
	      }, this._genericHooks, m.params);
	      return m;
	    } else if (this._defaultHandler && (onlyURL === '' || onlyURL === '/' || onlyURL === this._hash || isHashedRoot(onlyURL, this._useHash, this._hash))) {
	      manageHooks(function () {
	        manageHooks(function () {
	          _this2._callLeave();
	          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._defaultHandler.hooks };
	          _this2._defaultHandler.handler(GETParameters);
	        }, _this2._defaultHandler.hooks);
	      }, this._genericHooks);
	      return true;
	    } else if (this._notFoundHandler) {
	      manageHooks(function () {
	        manageHooks(function () {
	          _this2._callLeave();
	          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._notFoundHandler.hooks };
	          _this2._notFoundHandler.handler(GETParameters);
	        }, _this2._notFoundHandler.hooks);
	      }, this._genericHooks);
	    }
	    return false;
	  },
	  destroy: function destroy() {
	    this._routes = [];
	    this._destroyed = true;
	    clearTimeout(this._listenningInterval);
	    if (typeof window !== 'undefined') {
	      window.removeEventListener('popstate', this._onLocationChange);
	      window.removeEventListener('hashchange', this._onLocationChange);
	    }
	  },
	  updatePageLinks: function updatePageLinks() {
	    var self = this;
	
	    if (typeof document === 'undefined') return;
	
	    this._findLinks().forEach(function (link) {
	      if (!link.hasListenerAttached) {
	        link.addEventListener('click', function (e) {
	          var location = self.getLinkPath(link);
	
	          if (!self._destroyed) {
	            e.preventDefault();
	            self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
	          }
	        });
	        link.hasListenerAttached = true;
	      }
	    });
	  },
	  generate: function generate(name) {
	    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var result = this._routes.reduce(function (result, route) {
	      var key;
	
	      if (route.name === name) {
	        result = route.route;
	        for (key in data) {
	          result = result.toString().replace(':' + key, data[key]);
	        }
	      }
	      return result;
	    }, '');
	
	    return this._useHash ? this._hash + result : result;
	  },
	  link: function link(path) {
	    return this._getRoot() + path;
	  },
	  pause: function pause() {
	    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    this._paused = status;
	  },
	  resume: function resume() {
	    this.pause(false);
	  },
	  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
	    if (!isPushStateAvailable()) {
	      this.destroy();
	    }
	  },
	  lastRouteResolved: function lastRouteResolved() {
	    return this._lastRouteResolved;
	  },
	  getLinkPath: function getLinkPath(link) {
	    return link.pathname || link.getAttribute('href');
	  },
	  hooks: function hooks(_hooks) {
	    this._genericHooks = _hooks;
	  },
	
	  _add: function _add(route) {
	    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	    if (typeof route === 'string') {
	      route = encodeURI(route);
	    }
	    if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
	      this._routes.push({
	        route: route,
	        handler: handler.uses,
	        name: handler.as,
	        hooks: hooks || handler.hooks
	      });
	    } else {
	      this._routes.push({ route: route, handler: handler, hooks: hooks });
	    }
	    return this._add;
	  },
	  _getRoot: function _getRoot() {
	    if (this.root !== null) return this.root;
	    this.root = root(this._cLoc().split('?')[0], this._routes);
	    return this.root;
	  },
	  _listen: function _listen() {
	    var _this3 = this;
	
	    if (this._usePushState) {
	      window.addEventListener('popstate', this._onLocationChange);
	    } else if (isHashChangeAPIAvailable()) {
	      window.addEventListener('hashchange', this._onLocationChange);
	    } else {
	      var cached = this._cLoc(),
	          current = void 0,
	          _check = void 0;
	
	      _check = function check() {
	        current = _this3._cLoc();
	        if (cached !== current) {
	          cached = current;
	          _this3.resolve();
	        }
	        _this3._listenningInterval = setTimeout(_check, 200);
	      };
	      _check();
	    }
	  },
	  _cLoc: function _cLoc() {
	    if (typeof window !== 'undefined') {
	      if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
	        return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
	      }
	      return clean(window.location.href);
	    }
	    return '';
	  },
	  _findLinks: function _findLinks() {
	    return [].slice.call(document.querySelectorAll('[data-navigo]'));
	  },
	  _onLocationChange: function _onLocationChange() {
	    this.resolve();
	  },
	  _callLeave: function _callLeave() {
	    if (this._lastRouteResolved && this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.leave) {
	      this._lastRouteResolved.hooks.leave();
	    }
	  }
	};
	
	Navigo.PARAMETER_REGEXP = /([:*])(\w+)/g;
	Navigo.WILDCARD_REGEXP = /\*/g;
	Navigo.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
	Navigo.REPLACE_WILDCARD = '(?:.*)';
	Navigo.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
	Navigo.MATCH_REGEXP_FLAGS = '';
	
	exports.default = Navigo;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=navigo.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Import scss file for webpack to compile


__webpack_require__(0);

var _navigo = __webpack_require__(1);

var _navigo2 = _interopRequireDefault(_navigo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    // REGISTER ELEMENTS
    this.followerCount;
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

    this.router = new _navigo2.default(this.root, this.useHash);

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
      this.router.on('user/:id', function (params, query) {
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

    // ROUTE HANDLER

  }, {
    key: 'activateRouter',
    value: function activateRouter() {
      var _this2 = this;

      // Route handler that executes callback function when route matches format of '/user/:id'
      this.router.on('username=:id', function (params, query) {

        var username = params.id;

        // Clear followers list & home display
        _this2.$followersList.empty();
        _this2.$homeDisplay.empty();

        // Add bottom border to 'user-info' container
        _this2.$userInfoContainer.addClass('has-border-bottom');

        // Make Ajax call to get user data
        _this2.getUserData(username);

        // Make Ajax call to get user's follower list
        _this2.getFollowers(username);

        // Activate 'Load More' button
        _this2.activateLoadButton(username);
      }).resolve();
    }

    // GET INPUT VALUE (USERNAME) ON ENTER

  }, {
    key: 'getSearchValue',
    value: function getSearchValue() {
      var _this3 = this;

      this.$searchInput.keypress(function (event) {
        // Get input value (username)
        var username = event.currentTarget.value;

        if (event.which == 13) {
          event.preventDefault();

          // Add routing to URL
          _this3.router.navigate('username=' + username);

          // Clear input field
          _this3.$searchInput.val('');
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
      console.log(this.followerCount);
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
      var _this4 = this;

      var pageCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var loadCount = arguments[2];


      $.ajax({
        url: 'https://api.github.com/users/' + username + '/followers?per_page=' + this.loadAmount + '&page=' + pageCount,
        dataType: 'jsonp',
        success: function success(data) {

          // Render a list of all the followers
          var listOfFollowers = _this4.createFollowersList(data);

          // Append the list of followers into the followers container
          _this4.$followersList.append(listOfFollowers);

          // If user has more than 30 followers, insert 'Load More' button
          if (_this4.followerCount > _this4.loadAmount) {
            _this4.$loadButton.addClass('is-visible');
          }

          // Remove button if all followers are loaded
          if (loadCount >= _this4.followerCount) {
            _this4.$loadButton.removeClass('is-visible');
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
      var _this5 = this;

      var count = 1;
      var loadCount = this.loadAmount; // Count for amount of followers loaded

      // Click handler - load more followers on button click
      this.$loadButton.on('click', function (event) {
        event.preventDefault();
        count += 1;
        loadCount += _this5.loadAmount;

        // Fetch more followers
        _this5.getFollowers(username, count, loadCount);
      });
    }
  }]);

  return App;
}();

new App();

/***/ })
/******/ ]);