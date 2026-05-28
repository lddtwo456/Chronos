import { renderNotes } from './vexflow/noteRenderer.js';
import { Music } from '../shared/music.mjs';
import { generateBar } from '../shared/generator.js';

const app = document.getElementById('app');

app.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

app.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;    
    const fileName = await window.api.getFileName(files[0]);
    const music = await Music.fromMidiFile(fileName);
    console.log(music.defaultBPM, music.beatStamps, music.beatDistances);
});

const score = document.getElementById('score');
renderNotes(score, null);
console.log(generateBar());