export { Music };

class Music {
    constructor(fileName) {
        this.fileName = fileName;
        console.log('Parsing file:', fileName);
        this.data = window.api.parseFile(fileName);

        console.log(this.data.microsecondsPerBeat);
    }
}