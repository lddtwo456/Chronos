let templateRhythms = [];

class Note {
    constructor(duration, isRest = false) {
        this.duration = duration;
        this.rest = isRest;
    }

    getDuration() {
        switch (this.duration) {
            case 'w':
                return 4;
            case 'h.':
                return 3;
            case 'h':
                return 2;
            case 'q':
                return 1;
            case '8':
                return 0.5;
            case 't':
                return 0.333;
            case '16':
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
    constructor(notes, weight = 1) {
        this.notes = notes;
        this.duration = 0;
        this.weight = weight;
        for (let note of notes) {
            this.duration += note.getDuration();
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

function addTemplateRhythm(notes,isRests,weight=1) {
    noteObjs = [];
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let isRest = isRests[i];
        if (note === null) {
            throw new Error(`Invalid note duration: ${note}`);
        }
        noteObjs.push(new Note(note, isRest));
    }
    templateRhythms.push(new TemplateRhythm(noteObjs, weight));
}

function initializeTemplateRhythms() {
    addTemplateRhythm(['w'], [false],0.2);
    addTemplateRhythm(['h.'], [false],0.2);
    addTemplateRhythm(['h'], [false],0.4);
    addTemplateRhythm(['q'], [false]);
    addTemplateRhythm(['w'], [true],0.1);
    addTemplateRhythm(['h.'], [true],0.1);
    addTemplateRhythm(['h'], [true],0.2);
    addTemplateRhythm(['q'], [true],0.5);

    addTemplateRhythm(['8','q','8'], [false, false, false],0.25);
    addTemplateRhythm(['8','8'], [false, false],0.25);
    addTemplateRhythm(['8','8'], [true, false],0.25);
    addTemplateRhythm(['8','8'], [false, true],0.25);

    addTemplateRhythm(['t','t','t'], [false, false, false],0.1);
    addTemplateRhythm(['t','t','t'], [false, true, false],0.1);
    addTemplateRhythm(['t','t','t'], [false, false, true],0.1);
    addTemplateRhythm(['t','t','t'], [true, false, false],0.1);
    addTemplateRhythm(['t','t','t'], [true, false, true],0.1);
    addTemplateRhythm(['t','t','t'], [true, true, false],0.1);

    addTemplateRhythm(['16','8','16'], [false, false, false],0.2);
    addTemplateRhythm(['16','16','8'], [false, false, false],0.2);
    addTemplateRhythm(['8','16','16'], [false, false, false],0.2);
}

function generateBar(numBeats = 4, difficulty = 3) {
    let bar = [];
    let remainingDuration = numBeats;
    while (remainingDuration > 0) {
        // create copy of template rhythms so we can filter it without affecting the original
        // Select first x elements by difficulty
        let maxIndex = templateRhythms.length;
        switch (difficulty) {
            case 1:
                maxIndex = 8; // first 8 elements
                break;
            case 2:
                maxIndex = 12
                break;
            default:
                maxIndex = templateRhythms.length
                break;
        }
        let filteredTemplates = templateRhythms.slice(0, maxIndex);
        let remainingTemplates = filteredTemplates.filter(template => template.duration <= remainingDuration);
        if (remainingTemplates.length === 0) {
            break;
        }
        totalWeight = 0;
        for (let template of remainingTemplates) {
            totalWeight += template.weight;
        }
        cutoff = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        for (let template of remainingTemplates) {
            cumulativeWeight += template.weight;
            if (cumulativeWeight >= cutoff) {
                remainingTemplates = [template];
                break;
            }
        }
        let foo = remainingTemplates[0];
        bar.push(foo);
        remainingDuration -= foo.duration;
    }
    return new Bar(bar);
}

initializeTemplateRhythms();
console.log(generateBar(4, 1));