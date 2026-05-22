import { Factory } from "../../../node_modules/vexflow/build/esm/entry/vexflow.js";

// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    const vf = new Factory({ renderer: { elementId: div.id, width: 500, height: 500 } });
    const system = vf.System({ width: 300 });
    const stave = vf.Stave({
        x: 0,
        y: 0,
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

    system
        .addStave({
            stave: stave,
            voices: [vf.Voice().addTickables([
                vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
                vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
                vf.StaveNote({ keys: ['b/4'], duration: 'qr' }),
                vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
            ])],
        })
        .addClef('percussion')
        .addTimeSignature('4/4');

    vf.draw();
}