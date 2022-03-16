![Preview](https://i.imgur.com/a4xPtfI.png)

<div align="center">
  
  [![Build status][build]][build-url]
  [![Quality Gate Status][quality]][quality-url]
  [![Lines of Code][lines]][lines-url]
  [![Bugs][bugs]][bugs-url]
  [![GitHub license][license]][license-url]
  [![Issues][issues]][issues-url]
  [![Discord][discord]][discord-url]
  [![GitHub stars][stars]][stars-url]
  [![GitHub forks][forks]][forks-url]
  
</div>

---

<p align="center"> io-game is a networking prototype using sockets and express to communicate over the network, p5.js for the graphics and input, and electron.js for cross-platform support. The end goal is to create a online RPG syncing over various elements such as NPCs, chat messages and other transforms.
    <br> 
</p>

---

Thanks to electron the game has the potential to run on Windows, Linux, Mac and any web browser.

Due to the limitations of the p5.js graphics library and the complexity of three.js, this project has been discontinued and is now a relic in time. I'm still open to working on it if anyone has any suggestions.

## Table of Contents
1. [Setup](#setup)
2. [Building](#building)
3. [Debugging](#debugging)
4. [Electron](#electron)
5. [Libraries](#libraries)
6. [Contributing](https://github.com/valkyrienyanko/io-game/blob/master/.github/CONTRIBUTING.md)

## Setup

1. Clone `https://github.com/valkyrienyanko/io-game-v2.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Make sure you have yarn installed `npm i -g yarn`
4. Run `yarn install`
5. Start server with `yarn dev:server`
6. Create a client by opening up `localhost:7777/` in your browser

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

## Electron

An external debugger will automatically be attached if you run the app through `yarn dev:client`. Note that this has not been tested and may not even be the right way to go about debugging electron.

## Libraries

- [p5.js](https://p5js.org/reference/)
- [Express](https://expressjs.com/en/api.html)
- [Socket.io](https://socket.io/docs/)
- [Electron.js](https://electronjs.org/docs)
- [Nodemon](https://github.com/remy/nodemon/blob/master/README.md)

[build]: https://ci.appveyor.com/api/projects/status/uwamqaupefdfe3ho?svg=true
[build-url]: https://ci.appveyor.com/project/valkyrienyanko/io-game
[quality]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_io-game&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_io-game
[lines]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_io-game&metric=ncloc
[lines-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_io-game
[bugs]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_io-game&metric=bugs
[bugs-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_io-game
[license]: https://img.shields.io/github/license/valkyrienyanko/io-game?color=brightgreen
[license-url]: https://github.com/valkyrienyanko/io-game/blob/master/LICENSE
[issues]: https://img.shields.io/github/issues/valkyrienyanko/io-game
[issues-url]: https://github.com/valkyrienyanko/io-game/issues
[discord]: https://img.shields.io/discord/453710350454620160.svg
[discord-url]: https://discord.gg/thMupbv
[stars]: https://img.shields.io/github/stars/valkyrienyanko/io-game?color=brightgreen
[stars-url]: https://github.com/valkyrienyanko/io-game/stargazers
[forks]: https://img.shields.io/github/forks/valkyrienyanko/io-game?color=brightgreen
[forks-url]: https://github.com/valkyrienyanko/io-game/network
