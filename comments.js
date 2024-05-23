// create web server
var express = require('express');
var app = express();

// handle post requests
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handle comments
var comments = [
  'This is a comment',
  'This is another comment'
];

// handle get requests
app.get('/comments', function(req, res) {
  res.send(comments);
});

// handle post requests
app.post('/comments', function(req, res) {
  comments.push(req.body.comment);
  res.send('Successfully added comment');
});

// start web server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});

// run the server
// node comments.js
// open browser and go to http://localhost:3000/comments
// to view comments
// use curl to post a comment
// curl -X POST -d "comment=This is a new comment" http://localhost:3000/comments

// Path: index.js
// create web server
var express = require('express');
var app = express();

// handle get requests
app.get('/', function(req, res) {
  res.send('Hello World');
});

// start web server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});

// run the server
// node index.js
// open browser and go to http://localhost:3000
// to view Hello World
// or use curl
// curl http://localhost:3000

// Path: index.html
<!DOCTYPE html>
<html>
<head>
  <title>Comments</title>
</head>
<body>
  <h1>Comments</h1>
  <form id="commentForm">
    <input type="text" name="comment" />
    <input type="submit" value="Add Comment" />
  </form>
  <ul id="comments"></ul>
  <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
  <script>
    $(function() {
      $.get('http://localhost:3000/comments', function(comments) {
        comments.forEach(function(comment) {
          $('<li>').text(comment).appendTo('#comments');
        });
      });

      $('#commentForm').submit(function(event) {
        event.preventDefault();
        var comment = $('input 