import { renderNotes } from './vexflow/noteRenderer.js';
import { Music, setFileParser } from '../shared/music.mjs';

setFileParser((fileName) => window.api.parseFile(fileName));

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
    const music = new Music(fileName);
});

const score = document.getElementById('score');

renderNotes(score, null);