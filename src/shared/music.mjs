export { Music, setFileParser };

let parseFileFn = null;

function setFileParser(fn) {
    parseFileFn = fn;
}

class Music {
    constructor(fileName) {
        if (!parseFileFn) {
            throw new Error('Music parser is not initialized');
        }

        this.fileName = fileName;
        console.log('Parsing file:', fileName);
        this.data = parseFileFn(this.fileName);

        console.log(this.data.microsecondsPerBeat);
    }
}