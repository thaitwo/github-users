// Import scss file for webpack to compile
import './scss/style.scss';
import Navigo from 'navigo';

class App {
  constructor() {
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
    this.router = new Navigo(this.root, this.useHash);

    this.activateRouter();

    // ACTIVATE SEARCH FUNCTION
    this.getSearchValue();
  }



  // ROUTE HANDLER
  activateRouter() {
    // Route handler that executes callback function when route matches format of '/user/:id'
    this.router.on('user/:id', (params, query) => {
      const username = params.id;

      // Clear followers list & home display
      this.$followersList.empty();
      this.$homeDisplay.empty();

      // Add bottom border to 'user-info' container
      this.$userInfoContainer.addClass('has-border-bottom');

      // Make Ajax call to get user data
      this.getUserData(username);

      // Make Ajax call to get user's follower list
      this.getFollowers(username);

      // Activate 'Load More' button
      this.activateLoadButton(username);
    })
    .resolve();
  }



  // ROUTE HANDLER
  activateRouter() {
    // Route handler that executes callback function when route matches format of '/user/:id'
    this.router.on('username/:id', (params, query) => {

      const username = params.id;


      // Clear followers list & home display
      this.$followersList.empty();
      this.$homeDisplay.empty();

      // Add bottom border to 'user-info' container
      this.$userInfoContainer.addClass('has-border-bottom');

      // Make Ajax call to get user data
      this.getUserData(username);

      // Make Ajax call to get user's follower list
      this.getFollowers(username);

      // Activate 'Load More' button
      this.activateLoadButton(username);
    })
    .resolve();
  }



  // GET INPUT VALUE (USERNAME) ON ENTER
  getSearchValue() {

    this.$searchInput.keypress((event) => {
      // Get input value (username)
      const username = event.currentTarget.value;

      if (event.which == 13) {
        event.preventDefault();

        // Add routing to URL
        this.router.navigate(`username/${username}`);


        // Clear input field
        this.$searchInput.val('');
      }
    })
  }



  // FETCH USER DATA FROM API AND CREATE USER CARD
  getUserData(username) {

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      dataType: 'jsonp',
      success: this.createUserCard.bind(this)
    })
  }



  // RENDER HTML OF USER INFO --> INSERT INTO DOM
  createUserCard(data) {
    this.followerCount = data.data.followers;
    const handle = data.data.login;
    const imageLink = data.data.avatar_url;
    const htmlLink = data.data.html_url;
    const notFound = data.data.message;
    let cardHTML;

    // Render HTML for user card
    if (notFound) {
      cardHTML = `<div id="search-fail">Sorry, that username does not exist.</div>`
    } else {
      cardHTML = `
      <a href="${htmlLink}" target="_blank"><img src="${imageLink}"></a>
      <div class="username">${handle}</div>
      <div class="l-pad-top-4">
        <h4 class="follower-title">Followers</h4>
        <h3 class="follower-count l-pad-top-1">${this.followerCount}</h3>
      </div>
      `
    }

    // For each new query, clear user info container and 'load more' button, then add new user info into container
    this.$userInfoContainer.empty();
    this.$loadButton.removeClass('is-visible');
    this.$userInfoContainer.append(cardHTML);
  }



  // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM
  getFollowers(username, pageCount = 1, loadCount) {

    $.ajax({
      url: `https://api.github.com/users/${username}/followers?per_page=${this.loadAmount}&page=${pageCount}`,
      dataType: 'jsonp',
      success: (data) => {

        // Render a list of all the followers
        const listOfFollowers = this.createFollowersList(data);

        // Append the list of followers into the followers container
        this.$followersList.append(listOfFollowers);

        // If user has more than 30 followers, insert 'Load More' button
        if (this.followerCount > this.loadAmount) {
          this.$loadButton.addClass('is-visible');
        }

        // Remove button if all followers are loaded
        if (loadCount >= this.followerCount) {
          this.$loadButton.removeClass('is-visible');
        }
      }
    })
  }



  // RENDER HTML OF FOLLOWERS
  createFollowersList(data) {

    return data.data.map((user) => {
      const htmlLink = user.html_url;
      const imageLink = user.avatar_url;
      const username = user.login;

      // Render HTML for list of followers
      return `
      <li>
        <a href="${htmlLink}" target="_blank">
          <div class="avatar-image">
            <img src="${imageLink}">
          </div>
          <span>${username}</span>
        </a>
      </li>
      `
    }).join('');
  }



  // LOAD MORE FOLLOWERS WHEN 'LOAD MORE' BUTTON IS CLICKED
  activateLoadButton(username) {
    let count = 1;
    let loadCount = this.loadAmount; // Count for amount of followers loaded

    // Click handler - load more followers on button click
    this.$loadButton.on('click', (event) => {
      event.preventDefault();
      count += 1;
      loadCount += this.loadAmount;

      // Fetch more followers
      this.getFollowers(username, count, loadCount);
    })
  }
}

new App();
