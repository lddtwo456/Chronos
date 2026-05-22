import { Factory } from "../../../node_modules/vexflow/build/esm/entry/vexflow.js";

// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    const vf = new Factory({ renderer: { elementId: div.id, width: 500, height: 500 } });
    const stave = vf.Stave({
        x: 10,
        y: 40,
        width: 300,
        options: {
            spacing_between_lines_px: 20,
        }
    });

    stave.setConfigForLines([
        { visible: false },
        { visible: false },
        { visible: true },
        { visible: false },
        { visible: false },
    ]);

    const system = vf.System();
    system
        .addStave({
            voices: []
        })
        .addClef('percussion')
        .addTimeSignature('4/4');
        
    vf.draw();
}