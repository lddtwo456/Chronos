const midiParser = require('midi-parser-js');
const fs = require('fs');

function parseFile(filePath) {
    fs.readFile(filePath, 'base64', function (err, data) {
        var midiArray = midiParser.parse(data);
        console.log(midiArray.track[1]);
    });
}

module.exports = { parseFile };