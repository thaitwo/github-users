// Import scss file for webpack to compile
import './scss/style.scss';
import $ from 'jquery';
import Navigo from 'navigo';

class App {
  constructor() {
    // REGISTER ELEMENTS
    this.$form = $('form');
    this.$searchInput = $('#input');
    this.$homeDisplay = $('#home-display');
    this.$userCard = $('#card');
    this.$userInfoContainer = $('#user-info');
    this.$followersContainer = $('#followers-container');
    this.$followersList = $('#user-followers');
    this.$loadButton = $('.load-more');
    this.$userSearchButton;

    // SET FOLLOWER COUNT
    this.followerCount;

    // Amount of followers to load for each request
    this.loadAmount = 40;

    // NAVIGO ROUTING
    this.root = null;
    this.useHash = true;
    this.router = new Navigo(this.root, this.useHash);

    // LISTENS FOR CHANGES IN THE ROUTE (URL)
    this.activateRouter();

    // ACTIVATE SEARCH FUNCTION
    this.getSearchValue();
  }



  // ROUTE HANDLER
  activateRouter() {
    // Route handler that executes callback function when route matches format of '/username/:id'
    this.router.on('username/:id', (params) => {
      const username = params.id;

      // Clear followers list & home display
      this.$followersList.empty();
      this.$homeDisplay.empty();

      // Add bottom border to 'user-info' container
      this.$userInfoContainer.addClass('has-border-bottom');

      // Make Ajax call to get user data
      this.getUserData(username);

      // Make Ajax call to get user's follower list
      this.getFollowersData(username);

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

      // Generate new URL when 'Enter' key is pressed
      if (event.which == 13) {
        event.preventDefault();

        this.$userInfoContainer.removeClass('is-hidden');
        this.$followersContainer.removeClass('is-hidden');

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
    let cardHTML;
    const {
      login: username,
      avatar_url: imageUrl,
      html_url: htmlUrl,
      message: notFoundMessage
    } = data.data;

    // Set value for follower count
    this.followerCount = data.data.followers;


    // Render HTML for user card - if user exist, create user card, otherwise display error message
    if (notFoundMessage) {
      cardHTML = `<p id="search-fail">Sorry, that username does not exist. Please enter a valid username.</p>`
    } else {
      cardHTML = `
      <a href="${htmlUrl}" target="_blank"><img src="${imageUrl}"></a>
      <div class="username">${username}</div>
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



  // Activate 'Search user' button
  activateSearchUserButton() {
    this.$userSearchButton.on('click', (event) => {
      event.preventDefault();
      let username = event.currentTarget.id;

      // Add routing to URL
      this.router.navigate(`username/${username}`);
    })
  }



  // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM
  getFollowersData(username, pageCount = 1, loadCount) {
    $.ajax({
      url: `https://api.github.com/users/${username}/followers?per_page=${this.loadAmount}&page=${pageCount}`,
      dataType: 'jsonp',
      success: (data) => {

        // Render a list of all the followers
        this.createFollowersList(data);

        // Hide or show 'load more' button
        this.toggleLoadButton(loadCount);
      }
    })
  }



  // TOGGLE 'LOAD MORE' BUTTON
  toggleLoadButton(loadCount) {
    // If user has more than 30 followers, insert 'Load More' button
    if (this.followerCount > this.loadAmount) {
      this.$loadButton.addClass('is-visible');
    }

    // Remove button if all followers are loaded
    if (loadCount >= this.followerCount) {
      this.$loadButton.removeClass('is-visible');
    }
  }



  // RENDER HTML OF FOLLOWERS
  createFollowersList(data) {
    let followerListHTML = data.data.map((user) => {
      const {
        html_url: htmlUrl,
        avatar_url: imageUrl,
        login: username
      } = user;

      // Render HTML for list of followers
      return `
      <li>
        <div class="avatar-image">
          <a href="${htmlUrl}" target="_blank">
            <img src="${imageUrl}">
          </a>
        </div>
        <span>
          <a href="${htmlUrl}" target="_blank">${username}</a>
        </span>
        <button id="${username}" class="search-btn">Search user</button>
      </li>
      `
    }).join('');

    // Append the list of followers into the followers container
    this.$followersList.append(followerListHTML);

    // Register 'search-btn' element
    this.$userSearchButton = $('.search-btn');

    // Activate User Card Search Function
    this.activateSearchUserButton();
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
      this.getFollowersData(username, count, loadCount);
    })
  }
}

new App();
