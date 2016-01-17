var express = require('./node_modules/express');
var fs = require('fs');
var request = require('./node_modules/request');
var app = express();
var cheerio = require('./node_modules/cheerio');
var id, uri;

request('http://www.sports.ru/news/football/', function (err, res, body) {
    if (err) {
        console.log(err);
    } else {
        $ = cheerio.load(body);

        $('a[title="Комментарии к новости"]').each(function () {
            if (this.children[0].data > 30) {
                if (!id) {
                    id = (this.attribs.href.replace(/\D+/g,'')).substring(0, 10);
                    console.log('news id:', id);
                }
            }
        });

        var uri = 'http://www.sports.ru/api/comment/get/message.json?order_type=top10&message_id=' + id + '&message_class=Sports%3A%3ANews&limit=10&new_time=1&style=newjs&page=1';
        console.log('uri src:', uri);

        request({
            method: 'GET',
            uri: uri
        }, function (error, response, body) {
            if (err) {
                console.log(err);
            } else {
                fs.writeFile('./public/message.json', JSON.stringify(body));
                console.log('JSON created');

                app.use(express.static(__dirname + '/public'));

                app.listen(8080);
                console.log('Server running on port 8080.');
            }
        });
    }
});