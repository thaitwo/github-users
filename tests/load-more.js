module.exports = {
  'Load more test' : function (client) {
    client
      .url('https://thaitwo.github.io/github-users/')
      .setValue('input[type=text]', 'tobiasbueschel')
      .keys(client.Keys.ENTER)
      .click('.load-more')
      .assert.cssClassNotPresent('button', 'is-visible')
      .end();
  }
};