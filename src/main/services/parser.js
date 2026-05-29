const midiParser = require('midi-parser-js');
const fs = require('fs').promises;

async function parseFile(filePath) {
    const data = await fs.readFile(filePath);
    const midiArray = midiParser.parse(data);

    const microsecondsPerBeat = findMicrosecondsPerBeat(midiArray);
    const beatStamps = getBeatStamps(midiArray.track[1], midiArray.timeDivision);

    return {
        microsecondsPerBeat: microsecondsPerBeat,
        ticksPerBeat: midiArray.timeDivision,
        tickStamps: getNoteEvents(midiArray.track[1]),
        beatStamps: beatStamps,
        beatDistances: getDurations(beatStamps),
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

// Finds tick positions of noteon and noteoff events to use for turning midi data into sheet music
function getNoteEvents(midiTrack) {
    let dt = 0;
    let note = null; // Note to "listen" for
    let ticks = [];

    for (event of midiTrack.event) {
        dt += event.deltaTime;

        if (event.type === 9 || event.type === 8) {
            if (note === null) {
                note = event.data[0];
            }

            if (event.data[0] === note) {
                ticks.push(dt);
            }
        }
    }

    return ticks;
}

// Finds beat positions of noteon events
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

module.exports = parseFile;