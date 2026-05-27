// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
        VexFlow.setFonts('Bravura', 'Academico');

        const vf = new VexFlow.Factory({
            renderer: { elementId: div.id, width: 800, height: 500},
        });
        const score = vf.EasyScore();
        score.set({ time: '4/4' });
        
        const notes =
            score.notes('B4/q', { stem: 'up' })
            .concat(score.tuplet(
                score.notes('B4/8, B4/8, B4/8', { stem: 'up' }),
                { num_notes: 3, notes_occupied: 1 }))
            .concat(score.notes('B4/q/r, B4/8.., B4/32', { stem: 'up' }));

        const { stave, beams } = addMeasure(vf, score, 0, 0, 200, notes);
        stave
            .addClef('percussion')
            .addTimeSignature('4/4');
        
        vf.draw();
        for (const beam of beams) {
            beam.setContext(vf.getContext()).draw();
        }
    });
}

function addMeasure(vf, score, x, y, width, notes) {
    const beams = VexFlow.Beam.generateBeams(notes, { maintainStemDirections: true });
    const stave = 
        vf.System({ x: x, y: y, width: width})
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

    return { stave, beams };
}