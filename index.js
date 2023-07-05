const {
    app,
    Menu,
    BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    var template = [{
        label: "RapleJS",
        submenu: [
            {
                label: "About RapleJs",
                selector: "orderFrontStandardAboutPanel:"
            },
        ]
    }, {
        label: "Edit",
        submenu: [
            {
                label: "Undo",
                accelerator: "CmdOrCtrl+Z",
                selector: "undo:"
            },
            {
                label: "Redo",
                accelerator: "Shift+CmdOrCtrl+Z",
                selector: "redo:"
            },
            {
                type: "separator"
            },
            {
                label: "Cut",
                accelerator: "CmdOrCtrl+X",
                selector: "cut:"
            },
            {
                label: "Copy",
                accelerator: "CmdOrCtrl+C",
                selector: "copy:"
            },
            {
                label: "Paste",
                accelerator: "CmdOrCtrl+V",
                selector: "paste:"
            },
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                selector: "selectAll:"
            },
            {
                label: "Reload",
                accelerator: "CmdOrCtrl+R",
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Toggle Full Screen',
                accelerator: (function () {
                    if (process.platform === 'darwin')
                        return 'Ctrl+Command+F';
                    else
                        return 'F11';
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: (function () {
                    if (process.platform === 'darwin')
                        return 'Alt+Command+I';
                    else
                        return 'Ctrl+Shift+I';
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.toggleDevTools();
                }
            },
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function () { app.quit(); }
            }
        ]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: "Report an issue",
                // DO nothing for now
            },

            {
                label: 'Documentation',
                click: function () { require('electron').shell.openExternal('http://raplejs.org/docs'); }
            },
            {
                type: 'separator'
            },
            {
                label: 'Learn More',
                click: function () { require('electron').shell.openExternal('http://raplejs.org'); }
            },
        ]
    },




    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    // Create the browser window.
    win = new BrowserWindow({
        'node-integration': false,
        width: 1200,
        height: 680
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, `/build/index.html`),
        protocol: 'file:',
        slashes: true
    }));


    // debuging
    //    win.webContents.openDevTools() 
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
