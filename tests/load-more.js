module.exports = {
  'Load more test' : function (client) {
    client
      .url('file:///Users/tmtu/Repos/github-users/index.html')
      .setValue('input[type=text]', 'tobiasbueschel')
      .keys(client.Keys.ENTER)
      .click('.load-more')
      .assert.cssClassNotPresent('button', 'is-visible')
      .end();
  }
};