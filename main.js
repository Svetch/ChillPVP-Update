const {app, BrowserWindow, ipcMain, globalShortcut, protocol} = require('electron');
const {autoUpdater} = require('electron-updater');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require("url");

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

function initAutoUpdater(event, data) {
  autoUpdater.on('update-available', (info) => {
      event.sender.send('update-notofication','update-available')
  })
  autoUpdater.on('update-downloaded', (info) => {
      event.sender.send('update-notofication','update-downloaded')
      setTimeout(() => autoUpdater.quitAndInstall(),5000);
  })
  autoUpdater.on('update-not-available', (info) => {
      event.sender.send('update-notofication','update-not-available')
  })
  autoUpdater.on('checking-for-update', () => {
      event.sender.send('update-notofication','checking-for-update')
  })
  autoUpdater.on('error', (error) => {
      event.sender.send('update-notofication','update-error', error);
      app.quit();
  }) 
  autoUpdater.on('download-progress', (progressObj) => {
    event.sender.send('update-notofication','download-progress', progressObj)
  })
}

ipcMain.on('ready-to-update', (event, arg, data) => {
  if(!isDev)
  {
    autoUpdater.checkForUpdates();
    initAutoUpdater(event, data);
  }
  else
    event.sender.send('update-notofication','update-not-available');
})

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: __dirname + "./assets/icon.ico",
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight:600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  if(isDev)
    mainWindow.loadFile(path.join(__dirname,"index.html"));
}
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
