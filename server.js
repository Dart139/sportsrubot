var express = require('./node_modules/express');
var fs = require('fs');
var request = require('./node_modules/request');
var app = express();

request({
    method: 'GET',
    uri: 'http://www.sports.ru/api/comment/get/message.json?order_type=top10&message_id=1036167374&message_class=Sports%3A%3ANews&limit=10&new_time=1&style=newjs&page=1',
}, function (error, response, body) {
    fs.writeFile('./public/message.json', JSON.stringify(body));

    app.use(express.static(__dirname + '/public'));

    app.listen(8080);
});

console.log('Server running on port 8080.');