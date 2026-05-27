class Note {
    constructor(duration, isRest = false) {
        this.duration = duration;
        this.rest = isRest;
    }

    getDuration() {
        switch (this.duration) {
            case 'w':
                return 4;
            case 'hq':
                return 3.5;
            case 'h':
                return 2;
            case 'q':
                return 1;
            case 'e':
                return 0.5;
            case 't':
                return 0.333;
            case 's':
                return 0.25;
            default:
                return null;
        }
    }

    toString() {
        return '' + (this.rest ? 'Rest' : 'Note') + ': ' + this.duration;
    }
}

class TemplateRhythm {
    constructor(notes) {
        this.notes = notes;
        this.duration = 0;
        for (let note of notes) {
            this.duration += note.duration;
        }
    }
}

class Bar {
    constructor(templates) {
        this.templates = templates;
        this.notes = this.templatesToNotes();
        this.duration = 0;
    }

    templatesToNotes() {
        let notes = [];
        for (let template of this.templates) {
            notes = notes.concat(template.notes);
        }
        return notes;
    }
}

let templateRhythms = [];

function addTemplateRhythm(notes,isRests) {
    noteObjs = [];
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let isRest = isRests[i];
        if (note.getDuration() === null) {
            throw new Error(`Invalid note duration: ${note.duration}`);
        }
        noteObjs.push(new Note(note, isRest));
    }
    templateRhythms.push(new TemplateRhythm(noteObjs));
}

addTemplateRhythm(['q'], [false]);
console.log(templateRhythms[0]);