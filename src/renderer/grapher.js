let chartInstance = null;

export function drawGraph(canvas, music, playStamps, bpm) {
    let restTimes = [];
    for (let i = 1; i < playStamps.length; i++) {
        restTimes.push(playStamps[i] - playStamps[i-1]);
    }

    const expectedRestTimes = music.getDurations(bpm);
    const bpmPlayed = restTimes.map((time, i) => expectedRestTimes[i] / time * bpm);
    const data = bpmPlayed.map((played, i) => ({ x: playStamps[i+1], y: played }));

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'tempo played (bpm)',
                    data: data,
                    borderColor: 'blue',
                },
                {
                    label: 'count in tempo (bpm)',
                    data: [
                        {x: 0, y: bpm},
                        {x: playStamps[playStamps.length - 1], y: bpm}
                    ],
                    borderColor: 'gray',
                    borderDash: [6, 3],
                    pointRadius: 0,
                    fill: false,
                }
        ]
        },
        options: {
            scales: {
                x: { type: 'linear', position: 'bottom', max: playStamps[playStamps.length - 1] },
                y: { min: Math.min(bpm, ...bpmPlayed) - 30, max: Math.max(bpm, ...bpmPlayed) + 30 }
            }
        }
    });
}