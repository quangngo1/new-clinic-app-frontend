const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // --- DYNAMIC SIZE LOGIC ---
    // This checks if your package.json productName is "LabStatus" or similar
    const isLab = app.name.toLowerCase().includes('lab');

    const win = new BrowserWindow({
        // --- SIZE & POSITION ---
        width: 65,            // Slim width for one column of buttons
        // Lab gets 130px height (2 buttons), Clinic gets 320px (6 buttons)
        height: isLab ? 130 : 320,

        resizable: false,
        alwaysOnTop: true,    // Keeps it floating over other apps

        // --- STYLE ---
        frame: false,         // Removes the Windows title bar/borders
        transparent: true,    // Allows for rounded corners in your CSS
        hasShadow: true,

        // --- BEHAVIOR ---
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged, // Only allow DevTools if NOT a packaged EXE
        },
    });

    const isPackaged = app.isPackaged;
    if (isPackaged) {
        // Correct path for built production files
        win.loadFile(path.join(app.getAppPath(), 'build', 'index.html'));
    } else {
        win.loadURL('http://localhost:3000');
    }

    // Ensure it shows up correctly
    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});










/*
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 300,            // Increased size to make it easier to see
        height: 500,
        frame: true,           // Added frame back to help find it
        alwaysOnTop: true,
        show: false,           // Start hidden to prevent flickering
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // This helps find the right path in the EXE
    const isPackaged = app.isPackaged;
    const indexPath = isPackaged
        ? path.join(app.getAppPath(), 'build', 'index.html')
        : 'http://localhost:3000';

    if (isPackaged) {
        win.loadFile(indexPath).catch(err => console.error(err));
    } else {
        win.loadURL(indexPath);
    }

    // FORCE THE WINDOW TO SHOW
    win.once('ready-to-show', () => {
        win.show();
        win.focus();
    });

    // OPEN TOOLS IN A SEPARATE WINDOW TO SEE ERRORS
    win.webContents.openDevTools({ mode: 'detach' });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

*/












/*
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
            contextIsolation: false, // Easier for local network apps
        },
    });

    //win.loadURL('http://192.168.6.150:3000');
    //win.loadFile(path.join(__dirname, 'build/index.html'));

    // This works both in dev and after packaging
    const isDev = !app.isPackaged;

    if (isDev) {
        win.loadURL('http://localhost:3000');
    } else {
        // When packaged, the 'build' folder is in the same directory as main.js
        //win.loadFile(path.join(__dirname, 'build/index.html'));
        win.loadFile(path.join(__dirname, 'build', 'index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});*/
