export async function perform(music, bpm) {
    const spb = 1/bpm*60;
    countIn(8, spb);

    const numNotes = music.beatStamps.length;
    let startTime = null;
    let notesPlayed = 0;
    const musicStamps = music.getTimestamps(bpm);
    let playStamps = [];

    while (notesPlayed < numNotes) {
        if (await window.api.getPressed()) {
            if (startTime === null) {
                startTime = performance.now();
            }

            playStamps.push((performance.now() - startTime)/1000 + musicStamps[0]);

            notesPlayed += 1;
        }
    }

    return playStamps;
}

async function countIn(beats, spb) {
    const synth = new Tone.Synth().toDestination();
    const startTime = performance.now();
    let previousTime = 0;
    let beat = 0;
    while (beat < beats) {
        const now = performance.now();
        const crossedBeat = ((now-startTime) % (spb*1000)) < (previousTime % (spb*1000));
        if (crossedBeat) {
            if (beat % 4 === 0) {
                synth.triggerAttackRelease('C6', 0.025);
            } else {
                synth.triggerAttackRelease('C5', 0.025);
            }
            beat += 1;
        }
        previousTime = now - startTime;
    }
}