const path = require('path');
const url = require('url');
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const { autoUpdater } = require('electron-updater');
const debug = /--debug/.test(process.argv[2])

//package = require("./package.json");
//const feedUrl = package.publish
//console.log(feedUrl)
const feedUrl = `http://39.108.183.230/windemo/v2`;

let webContents;

let createWindow = () => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true
        }
    });

    webContents = win.webContents;

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'src/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
    app.setApplicationMenu(null);//关闭菜单栏

    webContents.openDevTools();
};

let sendUpdateMessage = (message, data) => {
    webContents.send('message', { message, data });
};

let checkForUpdates = () => {
    try{
        console.log(feedUrl)
        autoUpdater.setFeedURL(feedUrl);

        autoUpdater.on('error', function (message) {
            console.log("error")
            sendUpdateMessage('error', message)
        });
        autoUpdater.on('checking-for-update', function (message) {
            sendUpdateMessage('checking-for-update', message)
        });
        autoUpdater.on('update-available', function (message) {
            sendUpdateMessage('update-available', message)
        });
        autoUpdater.on('update-not-available', function (message) {
            sendUpdateMessage('update-not-available', message)
        });

        // 更新下载进度事件
        autoUpdater.on('download-progress', function (progressObj) {
            sendUpdateMessage('downloadProgress', progressObj)
        })
        autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
            ipcMain.on('updateNow', (e, arg) => {
                //some code here to handle event
                autoUpdater.quitAndInstall();
            })
            sendUpdateMessage('isUpdateNow');
        });

        //执行自动更新检查
        autoUpdater.checkForUpdates();
    }catch(err){
        sendUpdateMessage('exception', err)
    }
    console.log("update")
};

app.on('ready', () => {
    createWindow();

    setTimeout(checkForUpdates, 1000);
});

app.on('window-all-closed', () => app.quit());