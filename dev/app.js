// Import scss file for webpack to compile
import './scss/style.scss';


class App {
  constructor() {
    this.$form = $('form');
    this.$searchInput = $('#input');
    this.$userCard = $('#card');
    this.$userInfoContainer = $('#user-info');
    this.$followersContainer = $('#user-followers');
    this.$loadButton = $('.load-more');
    this.username;
    this.followerCount;
    this.getSearchValue();

  }


  // GET INPUT VALUE (USERNAME) ON ENTER
  getSearchValue() {
    const that = this;

    this.$searchInput.keypress((event) => {
      that.username = event.currentTarget.value; //username

      if (event.which == 13) {
        event.preventDefault();

        that.getUserData(that.username);

        that.getFollowers(that.username);

        that.activateLoadButton(that.username);

        // Clearn input field
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
    // Set follower count
    this.followerCount = data.data.followers;
    const handle = data.data.login;

    // Render HTML for user card
    const cardHTML =
      `
        <div class="username">${handle}</div>
        <div class="l-pad-top-4">
          <h4 class="follower-title">Followers</h4>
          <h3 class="follower-count l-pad-top-1">${this.followerCount}</h3>
        </div>
      `

    this.$userInfoContainer.empty();
    this.$userInfoContainer.append(cardHTML);
  }



  // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM
  getFollowers(username, count = 1) {
    const that = this;
    let counter = 0;

    $.ajax({
      url: `https://api.github.com/users/${username}/followers?per_page=40&page=${count}`,
      dataType: 'jsonp',
      success: (data) => {
        counter = counter + data.data.length;
        console.log('THIS COUNT', that.followerCount);
        console.log('STORED COUNT', counter);
        const storedUsername = username;

        // Render a list of all the followers
        const listOfFollowers = that.createFollowersList(data);

        // If new username is passed, empty followers container
        if (storedUsername !== username) {
          that.$followersContainer.empty();
        }

        // Append the list of followers into the followers container
        that.$followersContainer.append(listOfFollowers);

        // If user has more than 40 followers, insert 'Load More' button
        if (that.followerCount > 40) {
          that.$loadButton.addClass('is-visible');
        }

        if (counter >= that.followerCount) {
          console.log('button removed');
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

    this.$loadButton.on('click', (event) => {
      event.preventDefault();
      count = count + 1;

      that.getFollowers(username, count);
    })
  }
}

new App();
