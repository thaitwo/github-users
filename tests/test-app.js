module.exports = {
  'App test' : (client) => {
    client
      .url('file:///Users/tmtu/Repos/github-users/index.html')
      .pause(2000)
      .setValue('input[type=text]', 'asdfasdgsagfdsgad')
      .pause(2000)
      .keys(client.Keys.ENTER)
      .pause(2000)
      .assert.elementPresent('#search-fail')
      .assert.containsText('#search-fail', 'Sorry, that username does not exist.')
      .pause(2000)
      .setValue('input[type=text]', 'tobiasbueschel')
      .pause(2000)
      .keys(client.Keys.ENTER)
      .pause(2000)
      .click('.load-more')
      .pause(2000)
      .assert.cssClassNotPresent('button', 'is-visible')
      .click('#user-followers li:last-child a')
      .pause(4000)
      .end();
  }
};