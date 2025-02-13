import * as Tone from "tone";

let toneStarted = false;

export const startTone = async () => {
    if (!toneStarted) {
        await Tone.start();
        toneStarted = true;
    }
}

export const initAudioContext = async () => {
    if (Tone.getContext().state !== 'running') {
        await Tone.getContext().resume();
    }
};