const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let electronConfig = {
    "URL_LAUNCHER_TOUCH": process.env.URL_LAUNCHER_TOUCH == null ? 0 : process.env.URL_LAUNCHER_TOUCH === '1',
    "URL_LAUNCHER_TOUCH_SIMULATE": process.env.URL_LAUNCHER_TOUCH_SIMULATE == null ? 0 : process.env.URL_LAUNCHER_TOUCH_SIMULATE === '1',
    "URL_LAUNCHER_FRAME": process.env.URL_LAUNCHER_FRAME == null ? 0 : process.env.URL_LAUNCHER_FRAME === '1',
    "URL_LAUNCHER_KIOSK": process.env.URL_LAUNCHER_KIOSK == null ? 1 : process.env.URL_LAUNCHER_KIOSK === '1',
    "URL_LAUNCHER_NODE": process.env.URL_LAUNCHER_NODE == null ? 0 : process.env.URL_LAUNCHER_NODE === '1',
    "URL_LAUNCHER_WIDTH": (process.env.URL_LAUNCHER_WIDTH == null) ? 1920 : parseInt(process.env.URL_LAUNCHER_WIDTH),
    "URL_LAUNCHER_HEIGHT": (process.env.URL_LAUNCHER_HEIGHT == null) ? 1080 : parseInt(process.env.URL_LAUNCHER_HEIGHT),
    "URL_LAUNCHER_TITLE": (process.env.URL_LAUNCHER_TITLE == null) ? "RESIN.IO" : process.env.URL_LAUNCHER_TITLE,
    "URL_LAUNCHER_CONSOLE": process.env.URL_LAUNCHER_CONSOLE == null ? 0 : process.env.URL_LAUNCHER_CONSOLE === '1',
    "URL_LAUNCHER_URL": (process.env.URL_LAUNCHER_URL == null) ? "file:////usr/src/app/data/index.html" : process.env.URL_LAUNCHER_URL,
    "URL_LAUNCHER_ZOOM": (process.env.URL_LAUNCHER_ZOOM == null) ? 1.0 : parseFloat(process.env.URL_LAUNCHER_ZOOM),
    "URL_LAUNCHER_OVERLAY_SCROLLBARS": process.env.URL_LAUNCHER_CONSOLE == null ? 0 : process.env.URL_LAUNCHER_CONSOLE === '1'
};

// enable touch events if your device supports them
if (electronConfig.URL_LAUNCHER_TOUCH) {
    app.commandLine.appendSwitch("--touch-devices");
}
// simulate touch events - might be useful for touchscreen with partial driver support
if (electronConfig.URL_LAUNCHER_TOUCH_SIMULATE) {
    app.commandLine.appendSwitch("--simulate-touch-screen-with-mouse");
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: parseInt(electronConfig.URL_LAUNCHER_WIDTH),
        height: parseInt(electronConfig.URL_LAUNCHER_HEIGHT),
        frame: (electronConfig.URL_LAUNCHER_FRAME) ? true : false,
        title: electronConfig.URL_LAUNCHER_TITLE,
        kiosk: (electronConfig.URL_LAUNCHER_KIOSK) ? true : false,
        webPreferences: {
            nodeIntegration: (electronConfig.URL_LAUNCHER_NODE) ? true : false,
            zoomFactor: electronConfig.URL_LAUNCHER_ZOOM,
            overlayScrollbars: (electronConfig.URL_LAUNCHER_OVERLAY_SCROLLBARS) ? true : false
        }
    });

    window.webContents.on('did-finish-load', () => {
        setTimeout(() => {
            window.show();
        }, 300);

    });

    if (electronConfig.URL_LAUNCHER_CONSOLE) {
               window.openDevTools();
           }
    // mainWindow.setMenu(null);
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.setFullScreen(true);
    mainWindow.maximize()
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()


    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
