'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format } from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow({
    title: 'Viewr',
    width: 1050,
    height: 900,
    icon: path.join(__dirname, 'resources/viewr-icon.ico'),
    autoHideMenuBar: true, // TODO: Add menu options
    webPreferences: { nodeIntegration: true }
  });

  app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`${name} installed successfully`);
        if (isDevelopment) { window.webContents.openDevTools(); }
      });
  });

  if (isDevelopment) { window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`) }
  else {
    window.loadURL(
      format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      }));
  }

  window.on('closed', () => { mainWindow = null });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => { window.focus() });
  });

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') { app.quit(); }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) { mainWindow = createMainWindow(); }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => { mainWindow = createMainWindow(); });
