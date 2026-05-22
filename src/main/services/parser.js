const midiParser = require('midi-parser-js');
const fs = require('fs').promises;

async function parseFile(filePath) {
    const data = await fs.readFile(filePath);
    const midiArray = midiParser.parse(data);

    const microsecondsPerBeat = findMicrosecondsPerBeat(midiArray);
    const beatStamps = getBeatStamps(midiArray.track[1], midiArray.timeDivision);

    return {
        microsecondsPerBeat: microsecondsPerBeat,
        beatStamps: beatStamps,
        noteDistances: getDurations(beatStamps),
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

function getBeatStamps(midiTrack, ticksPerBeat) {
    let dt = 0;
    let note = null; // Note to "listen" for
    let stamps = [];

    for (event of midiTrack.event) {
        dt += event.deltaTime;
        
        if (event.type === 9) {
            if (note === null) {
                note = event.data[0];
            }

            if (event.data[0] === note) {
                stamps.push(dt/ticksPerBeat);
            }
        }
    }

    return stamps;
}

function getDurations(timestamps) {
    let durations = [];

    for (let i = 1; i < timestamps.length; i++) {
        durations.push(timestamps[i] - timestamps[i-1]);
    }

    return durations;
}

module.exports = { parseFile };