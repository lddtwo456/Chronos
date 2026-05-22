export { Music };

class Music {
    constructor(defaultBPM, beatStamps, noteDistances, notation) {
        this.defaultBPM = defaultBPM;
        this.beatStamps = beatStamps;
        this.beatDistances = noteDistances;
        this.notation = notation;
    }

    static async fromMidiFile(fileName) {
        const data = await window.api.parseFile(fileName);
        return new Music(60000000/data.microsecondsPerBeat, data.beatStamps, data.noteDistances, null);
    }

    static generate(args) {
        // generate the stuff with ur stuff
        return new Music(120, null, null, null);
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