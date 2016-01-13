var express = require('./node_modules/express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080);

console.log('Server running on port 8080.');