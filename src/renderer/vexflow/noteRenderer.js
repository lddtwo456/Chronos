// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
        VexFlow.setFonts('Bravura', 'Academico');

        const vf = new VexFlow.Factory({
            renderer: { elementId: div.id, width: 800, height: 500},
        });
        const score = vf.EasyScore();
        score.set({ time: '4/4' });
        
        const notes1 =
            score.notes('B4/q', { stem: 'up' })
            .concat(score.tuplet(
                score.notes('B4/8, B4/8, B4/8', { stem: 'up' }),
                { num_notes: 3, notes_occupied: 1 }))
            .concat(score.notes('B4/q/r, B4/8.., B4/32', { stem: 'up' }));
        const notes2 =
            score.tuplet(
                score.notes('B4/8, B4/8, B4/8', { stem: 'up' }),
                { num_notes: 3, notes_occupied: 1 })
            .concat(score.notes('B4/16, B4/16, B4/8, B4/8, B4/16, B4/16, B4/8.., B4/32', { stem: 'up' }));

        addMeasure(vf, score, 0, 0, 200, notes1)
            .addClef('percussion')
            .addTimeSignature('4/4');

        addMeasure(vf, score, 200, 0, 200, notes2);
        
        vf.draw();
    });
}

function addMeasure(vf, score, x, y, width, notes) {
    const autoBeamed = VexFlow.Beam.generateBeams(notes, { maintainStemDirections: true });
    autoBeamed.forEach(beam => {
        const group = beam.getNotes();
        score.beam(group);
    })

    return vf.System({ x: x, y: y, width: width})
        .addStave({
            voices: [score.voice(notes, { time: '4/4' })]
        })
        .setConfigForLines([
            { visible: false },
            { visible: false },
            { visible: true },
            { visible: false },
            { visible: false },
        ]);
}