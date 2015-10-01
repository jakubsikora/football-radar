var fs = require("fs");
var http = require("http");
var path = require("path");
var WebSocketServer = require("ws").Server;
var INTERVAL_BASE = 250;
var TEAMS_ROUTE = /^\/teams\/?$/;
var config = {};

config.WS_PORT = process.env.WS_PORT || 8080;
config.WS_HOST = process.env.WS_HOST || 'localhost';
config.SERVER_PORT = process.env.SERVER_PORT || 3000;

/**
 * @param {Array} arr
 * @return {Array}
 */
var copy = function(arr) {
    return arr.concat();
};

/**
 * @param {String} fileName
 */
var readFile = function(fileName) {
    return fs.readFileSync(
        path.resolve(
            path.join(__dirname, "..", "data", fileName)
        )
    );
};

var games = JSON.parse(readFile("games.json"));
var teams = JSON.parse(readFile("teams.json"));

var server = http.createServer(function(req, res) {
    if (TEAMS_ROUTE.test(req.url)) {
        console.log("[%s] GET /teams", new Date().toISOString());

        var teamData = JSON.stringify(teams);

        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json",
            "Content-Length": teamData.length
        });

        res.write(teamData);
    } else {
        res.writeHead(404);
    }

    res.end();
});

var app = new WebSocketServer({
    server: server,
    path: "/games"
});

app.on("connection", function(socket) {
    console.log("[%s] /games stream opened", new Date().toISOString());

    var queue = copy(games);

    var loop = setTimeout(function tick() {
        socket.send(JSON.stringify(queue.shift()));

        if (queue.length) {
            loop = setTimeout(tick, Math.random() * INTERVAL_BASE | 0);
        }
    }, Math.random() * INTERVAL_BASE | 0);

    socket.on("close", function() {
        console.log("[%s] /games stream closed", new Date().toISOString());
        clearTimeout(loop);
    });
});

/**
 * @param {Number} port
 * @param {String} host
 */
var listen = exports.listen = function(port, host) {
    server.listen(port, host, function() {
        var info = server.address();
        console.log("Websocket server listening on http://%s:%d", info.address, info.port);
    });
};

if (require.main === module) {
    listen(
        config.WS_PORT,
        config.WS_HOST
    );
}

var express = require('express');
var webApp = express();
var port = config.SERVER_PORT;
webApp.use(express.static(__dirname + '/../public'));
webApp.use('/i18n', express.static(__dirname + '/../i18n'));
webApp.use('/dist', express.static(__dirname + '/../dist'));
webApp.use('/images', express.static(__dirname + '/../assets/images'));
webApp.listen(port);
console.log('Webapp Server running on port', port);

