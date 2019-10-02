![Preview](https://i.gyazo.com/cd58edd4ea727bf35e0494689b07cfe0.png)

## What is IO-Game?

IO-Game networking prototype using sockets and express to communicate over the network, p5.js for the graphics and input, and electron.js for cross-platform support. The end goal is to create a online RPG syncing over various elements such as NPCs, chat messages and other transforms.

## Setup

1. Clone `https://github.com/valkyrienyanko/io-game-v2.git`.
2. Download and install `LTS` [Node.js](https://nodejs.org/en/).
3. Make sure you have yarn installed `npm i -g yarn`.
4. Run `yarn install`.
5. Start server with `yarn dev:server`.
6. Create a client by opening up `https://localhost:7777/` in your browser.

If you're using nodemon, the server will automatically restart whenever code has been changed. If you ever need to restart the server manually you can do so with the `rs` command.
Nodemon is used by default when using `yarn dev:server`. You can use `node .` instead if you prefer.

## Building

Use `yarn build` to build the electron app.

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

## Resources

### Libraries
- [p5.js](https://p5js.org/reference/)
- [Express](https://expressjs.com/en/api.html)
- [Socket.io](https://socket.io/docs/)
- [Electron.js](https://electronjs.org/docs)
- [Nodemon](https://github.com/remy/nodemon/blob/master/README.md)

## Contributing
See [CONTRIBUTING.md](https://github.com/valkyrienyanko/io-game-v2/blob/master/CONTRIBUTING.md)

If you have any questions, talk to me on discord **valk#3277**.
