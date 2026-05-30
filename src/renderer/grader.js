export async function perform(music, bpm) {
    const numNotes = music.beatStamps.length;
    let startTime = null;
    let notesPlayed = 0;
    let stamps = [];

    while (notesPlayed < numNotes) {
        if (await window.api.getPressed()) {
            if (startTime === null) {
                startTime = performance.now();
            }

            stamps.push((performance.now() - startTime)/1000);

            notesPlayed += 1;
        }
    }

    return stamps;
}