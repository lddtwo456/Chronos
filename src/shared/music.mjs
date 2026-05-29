export { Music };

import { generateBar } from './generator.js';

function ticksToNote(ticks) {
    switch (ticks) {
        case 3840:
            return 'w';
        case 2880:
            return 'h.';
        case 1920:
            return 'h';
        case 1440:
            return 'q.';
        case 960:
            return 'q';
        case 720:
            return '8.'
        case 480:
            return '8';
        case 360:
            return '16.';
        case 320:
            return 't';
        case 240:
            return '16';
        case 180:
            return '32.';
        case 120:
            return '32';
        default:
            return null;
    }
}

class Music {
    constructor(defaultBPM, beatStamps, beatDistances, bars) {
        this.defaultBPM = defaultBPM;
        this.beatStamps = beatStamps;
        this.beatDistances = beatDistances;
        this.bars = bars;
    }

    static async fromMidiFile(fileName) {
        const data = await window.api.parseFile(fileName);

        if (data.ticksPerBeat !== 480 && data.ticksPerBeat !== 960) {
            throw "Unsupported midi timeDivision";
        }

        console.log(data.tickStamps);

        let tickLengths = [];
        const tickMultiplier = Math.trunc(960 / data.ticksPerBeat); // Multiplied by all tick lengths to get tick lengths in normalized ticks (960 ticks per beat)
        for (let i = 1; i < data.tickStamps.length; i++) {
            tickLengths.push((data.tickStamps[i]-data.tickStamps[i-1]) * tickMultiplier);
        }
        console.log(tickLengths);

        let bars = [];
        let bar = [];
        let onRest = false;
        let barPosition = 0;
        for (const length of tickLengths) {
            if (barPosition === 3840) {
                bars.push(bar);
                bar = [];
                barPosition = 0;
            }

            if (length > 0) {
                const nextNotePosition = barPosition + length;
                if (nextNotePosition > 3840) {
                    const allowedLength = 3840 - barPosition; // Length of note that fills the rest of the bar
                    const barOverflow = nextNotePosition - 3840; // Lenght of note that overflows into the next bar

                    bar.push({
                        duration: ticksToNote(allowedLength),
                        rest: onRest
                    });

                    bars.push(bar);
                    bar = [{
                        duration: ticksToNote(barOverflow),
                        rest: true
                    }];

                    barPosition = barOverflow;
                } else {
                    bar.push({
                        duration: ticksToNote(length),
                        rest: onRest
                    });

                    barPosition += length;
                }
            }

            onRest = !onRest;
        }

        if (barPosition !== 0) {
            bar.push({
                duration: ticksToNote(3840 - barPosition),
                rest: true
            });

            bars.push(bar);
        }

        console.log(bars);

        return new Music(60000000/data.microsecondsPerBeat, data.beatStamps, data.beatDistances, bars);
    }

    static generate(numBars) {
        const bars = Array.apply(null, Array(numBars)).map(() => generateBar().notes);
        let beatStamps = [];
        for (let i = 0; i < bars.length; i++) {
            const bar = bars[i];
            let beat = 0;
            for (const note of bar) {
                if (note.rest === false) {
                    beatStamps.push(beat + 4*i);
                }
                beat += note.getDuration();
            }
        }

        let beatDistances = [];
        for (let i = 1; i < beatStamps.length; i++) {
            beatDistances.push(beatStamps[i]-beatStamps[i-1]);
        }

        return new Music(120, beatStamps, beatDistances, bars);
    }

    getTimestamps(bpm) {
        const beatDuration = 1/(bpm*60);
        return this.beatStamps.map(beat => beat*beatDuration);
    }

    getDurations(bpm) {
        const beatDuration = 1/(bpm*60);
        return this.beatDistances.map(distance => distance*beatDuration);
    }
}