const { uIOhook } = require('uiohook-napi');

let held = false;
let previouslyHeld = false;

uIOhook.on('keydown', (e) => {
    held = true;
    console.log('down', e.keycode);
});

uIOhook.on('keyup', (e) => {
    held = false;
    console.log('up', e.keycode);
});

uIOhook.start();

function getPressed() {
    const pressed = held && !previouslyHeld;
    previouslyHeld = held;
    return pressed;
}

module.exports = getPressed;