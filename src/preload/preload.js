const { contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('api', {
    parseFile (fileName) {
        return ipcRenderer.invoke('parse-file', fileName);
    },
    getFileName (file) {
        return webUtils.getPathForFile(file);
    }
}); 