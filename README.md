## Setup

1. Clone `https://github.com/valkyrienyanko/io-game-v2.git`.
2. Download and install `LTS` [Node.js](https://nodejs.org/en/).
3. Run `install-dependencies.bat`.
4. Start server with `start-server.bat`.
5. Port forward a port like '7777'. (TCP)
6. Create a client by opening up `https://localhost:7777/` in your browser.

If you're using a port other then '7777', make sure that you change the env PORT in the `start-server.bat`.

The server will automatically restart whenever code has been changed. If you ever need to restart the server manually you can do so with the `rs` command. If you do not want the server to auto restart you can edit the `start-server.bat` to say `node server.js` instead of `nodemon server.js`.

## Resources

- [p5.js Reference](https://p5js.org/reference/)
- [Express API](https://expressjs.com/en/api.html)
- [Socket.io Documentation](https://socket.io/docs/)
- [Nodemon Documentation](https://github.com/remy/nodemon/blob/master/README.md)

## Contributing

Talk to me on discord **valk#3277**.
