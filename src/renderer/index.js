import { renderNotes } from './vexflow/noteRenderer.js';
import { Music } from '../shared/music.mjs';
import { generateBar } from '../shared/generator.js';
import { perform } from './player.js';
import { drawGraph } from './grapher.js';

const score = document.getElementById('score');
let music = null;

window.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

window.addEventListener('drop', async (e) => {
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
    numBars = parseInt(e.target.value);
    barsOutput.textContent = e.target.value;
});

const bpmSlider = document.getElementById('bpm');
const bpmOutput = document.getElementById('selected_bpm');
bpmOutput.textContent = bpmSlider.value;
let selectedBPM = parseInt(bpmSlider.value);
bpmSlider.addEventListener('input', (e) => {
    selectedBPM = parseInt(e.target.value);
    bpmOutput.textContent = e.target.value;
});

let selectedMusic = null;
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', async (e) => {
    score.innerHTML = "";
    selectedMusic = Music.generate(numBars);
    renderNotes(score, selectedMusic.bars);
})

const canvas = document.getElementById('graph');
const playButton = document.getElementById('play');
playButton.addEventListener('click', () => {
    perform(selectedMusic, selectedBPM).then((r) => {
        console.log(r);
        drawGraph(canvas, selectedMusic, r, selectedBPM);
    });
})