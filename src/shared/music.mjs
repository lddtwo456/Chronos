export { Music };

import { generateBar } from './generator.js';

class Music {
    constructor(defaultBPM, beatStamps, beatDistances, bars) {
        this.defaultBPM = defaultBPM;
        this.beatStamps = beatStamps;
        this.beatDistances = beatDistances;
        this.bars = bars;
    }

    static async fromMidiFile(fileName) {
        const data = await window.api.parseFile(fileName);
        return new Music(60000000/data.microsecondsPerBeat, data.beatStamps, data.beatDistances, null);
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