## Setup

1. Clone `https://github.com/valkyrienyanko/io-game-v2.git`.
2. Download and install `LTS` [Node.js](https://nodejs.org/en/).
3. Make sure you have yarn installed `npm i -g yarn`.
4. Run `yarn install`.
5. Start server with `yarn dev:server`.
6. Create a client by opening up `https://localhost:7777/` in your browser.

If you're using nodemon, the server will automatically restart whenever code has been changed. If you ever need to restart the server manually you can do so with the `rs` command.
Nodemon is used by default when using `yarn dev:server`. You can use `node .` instead if you prefer.

## Debugging

### Server
The server will spit out errors directly to the server console. If you're using nodemon, it will restart the server when changes are made to any of the files.

### Browser
Viewing the developer console depends on which browser you're using. Here are some hotkeys to take note of.

| Chrome                 | Firefox               | Opera                  |
| ---------------------- | --------------------- | ---------------------- |
| `CTRL` + `SHIFT` + `J` | `CTRL` + `SHIFT` + `J`| `CTRL` + `SHIFT` + `I` |

### Electron
An external debugger will automatically be attached if you run the app through `yarn dev:client`.

## Contributing
If you would like to contribute, look at CONTRIBUTING.md

## Resources

### Libraries
- [p5.js](https://p5js.org/reference/)
- [Express](https://expressjs.com/en/api.html)
- [Socket.io](https://socket.io/docs/)
- [Electron.js](https://electronjs.org/docs)
- [Nodemon](https://github.com/remy/nodemon/blob/master/README.md)

## Contributing

Talk to me on discord **valk#3277**.
