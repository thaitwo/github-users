module.exports = {
  'Successful search test' : function (client) {
    client
      .url('file:///Users/tmtu/Repos/github-users/index.html')
      .setValue('input[type=text]', 'tobiasbueschel')
      .keys(client.Keys.ENTER)
      .assert.attributeContains('#user-info a', 'href', 'https://github.com')
      .assert.elementPresent('#user-followers li')
      .end();
  },
  'Fail search test' : function (client) {
    client
      .url('file:///Users/tmtu/Repos/github-users/index.html')
      .setValue('input[type=text]', 'asdkfaskdhaskrekadsf')
      .keys(client.Keys.ENTER)
      .pause(2000)
      .assert.elementPresent('#search-fail')
      .assert.containsText('#search-fail', 'Sorry, that username does not exist.')
      .end()
  }
};