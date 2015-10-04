# football-radar
[ ![Codeship Status for jakubsikora/football-radar](https://codeship.com/projects/868c9cd0-4999-0133-6ea0-168d58eb1296/status?branch=master)](https://codeship.com/projects/105645)

Simulate Premier League 2011/12 (React + Backbone + Websockets)

## Installation
1. Clone the repo.
2. Make sure you have node version min 0.12.5 installed.
3. Inside the repo folder run `npm install`.
4. Then to build and start the app `npm run build-production && npm start`.
5. By default app should be accessible via `http://localhost:3000`.

## Tests
To run tests inside repo folder type `npm test`; 

## Custom ports
By default app is using port `3000` for the web server and `8080` for websocket server. Also `localhost` as the app host. By specifing:
1. `SERVER_PORT=xxxx WS_PORT=xxxx WS_HOST=xxxxxx npm build-production` 
2. `SERVER_PORT=xxxx WS_PORT=xxxx WS_HOST=xxxxxx npm start` 
you can override the default settings.
