// create web server
// create server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');

var comments = {
    'haha': 'haha',
    'hehe': 'hehe',
    'heihei': 'heihei'
};

var server = http.createServer(function (req, res) {
    // parse request
    var parseUrl = url.parse(req.url);
    var pathname = parseUrl.pathname;
    var query = querystring.parse(parseUrl.query);
    // parse query string
    console.log('query', query);
    // parse post data
    var postData = '';
    req.on('data', function (chunk) {
        postData += chunk;
    });
    req.on('end', function () {
        var postQuery = querystring.parse(postData);
        console.log('postQuery', postQuery);
        // route
        if (pathname === '/getComments') {
            var data = JSON.stringify(comments);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data, 'utf8')
            });
            res.end(data);
        } else if (pathname === '/addComment') {
            var comment = postQuery.comment;
            comments[comment] = comment;
            var data = JSON.stringify(comments);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data, 'utf8')
            });
            res.end(data);
        } else {
            var filePath = path.join(__dirname, pathname);
            fs.exists(filePath, function (exists) {
                if (exists) {
                    fs.readFile(filePath, function (err, data) {
                        if (err) {
                            res.writeHead(500);
                            res.end('Server Internal Error');
                        } else {
                            res.writeHead(200);
                            res.end(data);
                        }
                    });
                } else {
                    res.writeHead(404);
                    res.end('404 Not Found');
                }
            });
        }
    });
});

server.listen(8080, function () {
    console.log('Server is running at http://localhost:8080/');
});