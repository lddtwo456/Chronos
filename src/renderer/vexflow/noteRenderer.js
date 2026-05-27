// Given div to render to and object that contains note data, render notes to div
export function renderNotes(div, notes) {
    VexFlow.loadFonts('Bravura', 'Academico').then(() => {
        VexFlow.setFonts('Bravura', 'Academico');

        const vf = new VexFlow.Factory({
            renderer: { elementId: div.id, width: 800, height: 500},
        });
        const system1 = vf.System({ 
            width: 200 
        });
        const system2 = vf.System({
            x: 200,
            width: 200
        })
        const b1 = vf.Voice().addTickables([
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'qr' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
        ]);
        const b2 = vf.Voice().addTickables([
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: '8' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'qr' }),
            vf.StaveNote({ keys: ['b/4'], duration: 'q' }),
        ]);
;
        system1
            .addStave({ 
                voices: [b1] 
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

        system2
            .addStave({
                voices: [b2]
            })
            .setConfigForLines([
                { visible: false },
                { visible: false },
                { visible: true },
                { visible: false },
                { visible: false },
            ]);

        console.log(system2.x);
        
        vf.draw();
    });
}