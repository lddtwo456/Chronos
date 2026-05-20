const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { parseFile } = require('./services/parser.js');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload', 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile('./src/renderer/index.html');
}

app.whenReady().then(async () => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.handle('parse-file', (e, fileName) => {
    return parseFile(fileName);
});