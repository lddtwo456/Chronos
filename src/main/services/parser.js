const midiParser = require('midi-parser-js');
const fs = require('fs');
const { webUtils } = require('electron');

function parseFile(file) {
    const filePath = webUtils.getPathForFile(file);
    
}

module.exports = { parseFile };