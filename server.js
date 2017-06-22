const express = require('express');
const path = require('path');
const app = express();

// Tells Express to look for the static assets in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// When a GET request is made to the any page (*), render the 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

// Sets the port to local host 8000
const port = process.env.PORT || 8000;
app.listen(port);