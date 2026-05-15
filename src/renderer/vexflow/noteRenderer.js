import { Renderer, TabStave } from '../../../node_modules/vexflow/build/esm/entry/vexflow.js';

export { renderNotes };

// Given div to render to and object that contains note data, render notes to div
function renderNotes(div, notes) {
    console.log("this is being called");
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    renderer.resize(500, 500);
    const ctx = renderer.getContext();
    ctx.setFont('Arial', 10);

    const stave = new TabStave(10, 40, 400);
    stave.addClef('percussion');
    stave.setContext(ctx).draw();
}