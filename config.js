var config = {};

config.websockets = {};
config.server = {};

config.websockets.port = process.env.WS_PORT || 8080;
config.websockets.host = process.env.WS_HOST || "localhost";

config.server.port = process.env.SERVER_PORT || 3000;

module.exports = config;