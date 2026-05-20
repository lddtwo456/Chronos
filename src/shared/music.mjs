export { Music };

class Music {
    constructor(fileName, data) {
        this.fileName = fileName;
        this.data = data;
    }

    static async fromMidiFile(fileName) {
        const data = await window.api.parseFile(fileName);
        return new Music(fileName, data);
    }
}