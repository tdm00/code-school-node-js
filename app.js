var url = require('url');
var request = require('request');
var express = require('express');
var ejs = require('ejs');

var app = express();

app.get('/', function(req, response) {
  options = {
    protocol: "http:",
    host: "search.twitter.com",
    pathname: '/search.json',
    query: { q: "codeschool"}
  };

  var searchURL = url.format(options);

  request(searchURL, function(err, res, body) {
    var tweets = JSON.parse(body).results;
    response.render('tweets.ejs', {tweets: tweets, name: 'codeschool'});
  });
});
  
app.get('/:username', function(req, response) {
  var username = req.params.username;
  options = {
    protocol: "http:",
    host: "search.twitter.com",
    pathname: '/search.json',
    query: { q: username}
  };

  var searchURL = url.format(options);

  request(searchURL, function(err, res, body) {
    var tweets = JSON.parse(body).results;
    response.render('tweets.ejs', {tweets: tweets, name: username});
  });
});
  
app.listen(8080);