const midiParser = require('midi-parser-js');
const fs = require('fs').promises;

async function parseFile(filePath) {
    const data = await fs.readFile(filePath);
    const midiArray = midiParser.parse(data);

    return {
        microsecondsPerBeat: findMicrosecondsPerBeat(midiArray),
        timestamps: getTimeStamps(midiArray.track[1]),
    };
}

function findMicrosecondsPerBeat(midiArray) {
    for (track of midiArray.track) {
        for (event of track.event) {
            if (event.type === 255 && event.metaType === 81) {
                return event.data;
            }
        }
    }

    return 500000;
}

function getTimeStamps(midiTrack) {
    let dt = 0;

    for (event of midiTrack.event) {
        dt += event.deltaTime;
        console.log(dt);
    }

    return 0;
}

function getDurations(timestamps) {

}

module.exports = { parseFile };