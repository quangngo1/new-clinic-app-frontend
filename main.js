const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 55,           // Narrow width
        height: 280,         // Tall height to accommodate 6 buttons + gaps
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});