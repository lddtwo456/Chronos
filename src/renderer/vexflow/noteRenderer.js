// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
        VexFlow.setFonts('Bravura', 'Academico');

        const vf = new VexFlow.Factory({
            renderer: { elementId: div.id, width: 500, height: 200},
        });
        const system = vf.System({ width: 400 });
        const note = [
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'qr' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
            vf.BarNote(),
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'qr' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
        ]
        const voice = vf.Voice({
            num_beats: 4,
            beat_value: 4,
        });

        voice.setStrict(false);
        voice.addTickables(note);

        system
            .addStave({ 
                voices: [voice] 
            })
            .addClef('percussion')
            .addTimeSignature('4/4')
            .setConfigForLines([
                { visible: false },
                { visible: false },
                { visible: true },
                { visible: false },
                { visible: false },
            ]);
        vf.Beam({ notes: note.slice(1, 3) });
        vf.Beam({ notes: note.slice(7, 9) });
        vf.draw();
    });
}