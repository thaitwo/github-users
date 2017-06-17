// Import scss file for webpack to compile
import './scss/style.scss';


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
    this.followerCount;

    // ACTIVATE SEARCH FUNCTION
    this.getSearchValue();

  }


  // GET INPUT VALUE (USERNAME) ON ENTER
  getSearchValue() {
    const that = this;

    this.$searchInput.keypress((event) => {
      // Get input value (username)
      const username = event.currentTarget.value;

      if (event.which == 13) {
        event.preventDefault();

        // Clear followers list & home display
        this.$followersList.empty();
        this.$homeDisplay.empty();

        // Add bottom border to 'user-info' container
        this.$userInfoContainer.addClass('has-border-bottom');

        // Make Ajax call to get user data
        that.getUserData(username);

        // Make Ajax call to get user's follower list
        that.getFollowers(username);

        // Activate 'Load More' button
        that.activateLoadButton(username);

        // Clear input field
        that.$searchInput.val('');
      }
    })
  }


  // FETCH USER DATA FROM API AND CREATE USER CARD
  getUserData(username) {
    const that = this;

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      dataType: 'jsonp',
      success: (data) => {
        that.createUserCard(data);
      }
    })
  }



  // RENDER HTML OF USER INFO --> INSERT INTO DOM
  createUserCard(data) {
    this.followerCount = data.data.followers;
    const handle = data.data.login;
    const imageLink = data.data.avatar_url;
    const htmlLink = data.data.html_url;
    let cardHTML;

    // Render HTML for user card
    if (typeof handle === 'undefined') {
      cardHTML = `<div>Sorry, that username does not exist.</div>`
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

    this.$userInfoContainer.empty();
    this.$loadButton.removeClass('is-visible');
    this.$userInfoContainer.append(cardHTML);
  }



  // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM
  getFollowers(username, pageCount = 1, loadCount) {
    const that = this;
    // let counter = 0;

    $.ajax({
      url: `https://api.github.com/users/${username}/followers?per_page=40&page=${pageCount}`,
      dataType: 'jsonp',
      success: (data) => {
        // counter = counter + data.data.length;
        console.log(this.followerCount);

        // Render a list of all the followers
        const listOfFollowers = this.createFollowersList(data);

        // Append the list of followers into the followers container
        this.$followersList.append(listOfFollowers);

        // If user has more than 30 followers, insert 'Load More' button
        if (this.followerCount > 40) {
          this.$loadButton.addClass('is-visible');
        }

        // Remove button if all followers are loaded
        if (loadCount >= this.followerCount) {
          that.$loadButton.removeClass('is-visible');
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
          <img src="${imageLink}">
          <span>${username}</span>
        </a>
      </li>
      `
    }).join('');
  }



  // LOAD MORE FOLLOWERS WHEN 'LOAD MORE' BUTTON IS CLICKED
  activateLoadButton(username) {
    const that = this;
    let count = 1;
    let loadCount = 40; // Count for amount of followers loaded

    // Click handler - load more followers on button click
    this.$loadButton.on('click', (event) => {
      event.preventDefault();
      count += 1;
      loadCount += 40;

      that.getFollowers(username, count, loadCount);
    })
  }
}

new App();
