import './scss/style.scss';


class App {
  constructor() {
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
  getSearchValue() {
    const that = this;

    this.$searchInput.keypress((event) => {
      that.username = event.target.value; //username

      if (event.which == 13) {
        event.preventDefault();

        that.getUserData(that.username);

        that.getFollowers(that.username);

        that.activateLoadMoreButton(that.username);
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
        // console.log(data);
        that.createUserCard(data);
      }
    })
  }



  // RENDER HTML OF USER INFO --> INSERT INTO DOM
  createUserCard(data) {
    const handle = data.data.login;
    this.followerCount = data.data.followers;

    const cardHTML =
      `
        <div>Handle: ${handle}</div>
        <div>Follower Count: ${this.followerCount}</div>
      `
    this.$userInfoContainer.empty();
    this.$userInfoContainer.append(cardHTML);
  }



  // FETCH LIST OF FOLLOWERS --> RENDER HTML OF LIST OF FOLLOWERS --> INSERT INTO DOM
  getFollowers(username, count = 1) {
    const that = this;

    $.ajax({
      url: `https://api.github.com/users/${username}/followers?per_page=40&page=${count}`,
      dataType: 'jsonp',
      success: (data) => {
        // console.log(this.followerCount);
        // console.log(data);
        const storedUsername = username;

        // Render a list of all the followers
        const listOfFollowers = that.createFollowersList(data);

        // If new username is passed, empty followers container
        if (storedUsername !== username) {
          this.$followersContainer.empty();
        }

        // Append the list of followers into the followers container
        this.$followersContainer.append(listOfFollowers);

        // If user has more than 40 followers, insert 'Load More' button
        if (this.followerCount > 40) {
          this.$loadMoreButton.addClass('is-visible');
        }
      }
    })
  }



  // RENDER HTML OF FOLLOWERS
  createFollowersList(data) {
    console.log(data.data);

    return data.data.map((user) => {
      const imageLink = user.avatar_url;
      const username = user.login;

      return `
      <li>
        <img src="${imageLink}">
        <span>${username}</span>
      </li>
      `
    }).join('');
  }



  // LOAD MORE FOLLOWERS WHEN 'LOAD MORE' BUTTON IS CLICKED
  activateLoadMoreButton(username) {
    const that = this;
    let count = 1;

    this.$loadMoreButton.on('click', (event) => {
      event.preventDefault();
      count = count + 1;

      that.getFollowers(username, count);
    })
  }
}

new App();
