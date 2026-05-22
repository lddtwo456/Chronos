export { Music };

class Music {
    constructor(defaultBPM, beatStamps, noteDistances) {
        this.defaultBPM = defaultBPM;
        this.beatStamps = beatStamps;
        this.beatDistances = noteDistances;
    }

    static async fromMidiFile(fileName) {
        const data = await window.api.parseFile(fileName);
        return new Music(60000000/data.microsecondsPerBeat, data.beatStamps, data.noteDistances);
    }
}