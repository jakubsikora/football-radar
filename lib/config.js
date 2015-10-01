var fs = require('fs');
var config = {};

config.WS_PORT = parseInt(process.env.WS_PORT, 10) || 8080;
config.WS_HOST = process.env.WS_HOST || 'localhost';
config.SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

fs.writeFile('./public/config.json', JSON.stringify(config), function(err) {
    if(err) {
        return console.log(err);
    }
});
