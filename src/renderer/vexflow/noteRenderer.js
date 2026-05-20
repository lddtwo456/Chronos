import { Renderer, Stave, Clef } from "../../../node_modules/vexflow/build/esm/entry/vexflow.js";

// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    renderer.resize(500, 500);
    const ctx = renderer.getContext();
    ctx.setFont('Arial', 10);

    const stave = new Stave(10, 40, 400);
    stave.setNumLines(1);
    stave.addClef('percussion');
    stave.setContext(ctx).draw();
}