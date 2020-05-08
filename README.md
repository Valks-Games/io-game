![Preview](https://i.imgur.com/a4xPtfI.png)

[![Build status][build]][build-url]
[![Quality Gate Status][quality]][quality-url]
[![Lines of Code][lines]][lines-url]
[![Bugs][bugs]][bugs-url]
[![GitHub license][license]][license-url]
[![Issues][issues]][issues-url]
[![Discord][discord]][discord-url]
[![GitHub stars][stars]][stars-url]
[![GitHub forks][forks]][forks-url]

<h1>io-game</h1>
io-game is a networking prototype using sockets and express to communicate over the network, p5.js for the graphics and input, and electron.js for cross-platform support. The end goal is to create a online RPG syncing over various elements such as NPCs, chat messages and other transforms.

Thanks to electron the game has the potential to run on Windows, Linux, Mac and any web browser.

## Table of Contents
1. [Setup](#setup)
2. [Building](#building)
3. [Debugging](#debugging)
4. [Electron](#electron)
5. [Libraries](#libraries)
6. [Contributing](#contributing)
7. [Support](#support)

<h2 align="center">Setup</h2>

1. Clone `https://github.com/valkyrienyanko/io-game-v2.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Make sure you have yarn installed `npm i -g yarn`
4. Run `yarn install`
5. Start server with `yarn dev:server`
6. Create a client by opening up `localhost:7777/` in your browser

If you're using nodemon, the server will automatically restart whenever code has been changed. If you ever need to restart the server manually you can do so with the `rs` command.
Nodemon is used by default when using `yarn dev:server`. You can use `node .` instead if you prefer.

<h2 align="center">Building</h2>

Use `yarn build` to build the electron app.

<h2 align="center">Debugging</h2>

<h3 align="center">Server</h3>

The server will spit out errors directly to the server console. If you're using nodemon, it will restart the server when changes are made to any of the files.

<h3 align="center">Browser</h3>

Viewing the developer console depends on which browser you're using. Here are some hotkeys to take note of.

| Chrome                 | Firefox               | Opera                  |
| ---------------------- | --------------------- | ---------------------- |
| `CTRL` + `SHIFT` + `J` | `CTRL` + `SHIFT` + `J`| `CTRL` + `SHIFT` + `I` |

<h2 align="center">Electron</h2>

An external debugger will automatically be attached if you run the app through `yarn dev:client`. Note that this has not been tested and may not even be the right way to go about debugging electron.

<h2 align="center">Libraries</h2>

- [p5.js](https://p5js.org/reference/)
- [Express](https://expressjs.com/en/api.html)
- [Socket.io](https://socket.io/docs/)
- [Electron.js](https://electronjs.org/docs)
- [Nodemon](https://github.com/remy/nodemon/blob/master/README.md)

<h2 align="center">Contributing</h2>

Read [this](https://github.com/valkyrienyanko/io-game-v2/blob/master/CONTRIBUTING.md) if you're interested in contributing.

<h2 align="center">Support</h2>

If you have any questions, talk to me on discord **valk#3277**.

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
