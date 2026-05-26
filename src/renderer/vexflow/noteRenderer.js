import { Factory } from "../../../node_modules/vexflow/build/esm/entry/vexflow.js";

// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    const vf = new Factory({ renderer: { elementId: div.id, width: 500, height: 500 } });
    const system = vf.System({ width: 300 });

    const staveNotes = [
        vf.StaveNote({ keys: ['b/4'], duration: '8', stem_direction: 1 }),
        vf.StaveNote({ keys: ['b/4'], duration: '8', stem_direction: 1 }),
        vf.StaveNote({ keys: ['b/4'], duration: 'q', stem_direction: 1 }),
        vf.StaveNote({ keys: ['b/4'], duration: 'qr', stem_direction: 1 }),
        vf.StaveNote({ keys: ['b/4'], duration: 'q', stem_direction: 1}),
    ];

    const stave = system
        .addStave({
            voices: [vf.Voice().addTickables(staveNotes)],
        })
        .addClef('percussion')
        .addTimeSignature('4/4');

    stave.setConfigForLines([
        { visible: false },
        { visible: false },
        { visible: true },
        { visible: false },
        { visible: false },
    ]);

    vf.draw();
}