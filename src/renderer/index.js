import { renderNotes } from './vexflow/noteRenderer.js';
import { Music } from '../shared/music.mjs';
import { generateBar } from '../shared/generator.js';

const app = document.getElementById('app');
const score = document.getElementById('score');
let music = null;

app.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

app.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;    
    const fileName = await window.api.getFileName(files[0]);
    
    music = await Music.fromMidiFile(fileName);

    score.innerHTML = "";
    renderNotes(score, music.bars);
});

const barsSlider = document.getElementById('bars');
const barsOutput = document.getElementById('num_bars');
barsOutput.textContent = barsSlider.value;
let numBars = parseInt(barsSlider.value);
barsSlider.addEventListener('input', (e) => {
    numBars = parseInt(event.target.value);
    barsOutput.textContent = event.target.value;
});

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', (e) => {
    score.innerHTML = "";
    music = Music.generate(numBars);
    renderNotes(score, music.bars);
})