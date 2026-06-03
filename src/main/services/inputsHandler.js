const { uIOhook } = require('uiohook-napi');

let keys = {};
let previousKeys = {};

uIOhook.on('keydown', (e) => {
    keys[e.keycode] = true;
    console.log('down', e.keycode);
});

uIOhook.on('keyup', (e) => {
    keys[e.keycode] = false;
    console.log('up', e.keycode);
});

uIOhook.start();

function getPressed() {
    let pressed = false;
    for (const key of Object.keys(keys)) {
        console.log(key, keys[key], previousKeys[key]);
        if (keys[key] && !previousKeys[key]) {
            pressed = true;
        }
    }
    previousKeys = structuredClone(keys);

    return pressed;
}

module.exports = getPressed;