const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://142.160.71.57:7777/')
})
