const { uIOhook } = require('uiohook-napi');

let keys = {};
let previousKeys = {};

uIOhook.on('keydown', (e) => {
    keys[e.keycode] = true;
});

uIOhook.on('keyup', (e) => {
    keys[e.keycode] = false;
});

uIOhook.start();

function getPressed() {
    let pressed = false;
    for (const key of Object.keys(keys)) {
        if (keys[key] && !previousKeys[key]) {
            pressed = true;
        }
    }
    previousKeys = structuredClone(keys);

    return pressed;
}

module.exports = getPressed;