import { create } from "zustand";
import gameGlobalsStore from "../gameGlobals/gameGlobals";
import { Graphics } from "pixi.js";
// import * as Tone from "tone";

interface FxStore {
    initiateFadePlate: () => void;
    isFaded: boolean;
    fadeToBlack: (duration: number) => Promise<void>;
    unfadeToBlack: (duration: number) => Promise<void>;
    fadeMusicVolume: (targetVolume: number, duration: number) => Promise<void>;
    // applyLowpassFilter: (frequency: number) => Promise<void>;
    // removeLowpassFilter: () => Promise<void>;
}

const useFxStore = create<FxStore>((set) => ({
    initiateFadePlate: async () => {
        set({ isFaded: false });
        if (gameGlobalsStore.getState().app) {
            const fadePlate = new Graphics();
            fadePlate.label = "fadePlate";
            fadePlate.rect(0, 0, gameGlobalsStore.getState().app.stage.width, gameGlobalsStore.getState().app.stage.height);
            fadePlate.fill({ color: 0x000000 });
            fadePlate.alpha = 0;
            fadePlate.zIndex = 9999;
            gameGlobalsStore.getState().app.stage.addChild(fadePlate);
        } else {
            console.warn("App not found - Can't initiate fade plate");
        }
    },
    isFaded: false,
    fadeToBlack: async (duration: number): Promise<void> => {
        console.log("Fading to black");
        const fadePlate = gameGlobalsStore.getState().app.stage.children.find((child: Graphics) => child.label === "fadePlate");
        if (fadePlate) {
            return await fade(fadePlate, 1, duration);
        } else {
            console.warn("Fade plate not found - Initializing fade plate first");
            useFxStore.getState().initiateFadePlate();
            return await useFxStore.getState().fadeToBlack(duration);
        }
    },
    unfadeToBlack: async (duration: number): Promise<void> => {
        console.log("Unfading to black");
        const fadePlate = gameGlobalsStore.getState().app.stage.children.find((child: Graphics) => child.label === "fadePlate");
        if (fadePlate) {
            return await fade(fadePlate, 0, duration);
        }
    },
    fadeMusicVolume: async (targetVolume: number, duration: number): Promise<void> => {
        const gameMusic = gameGlobalsStore.getState().musicPlayer;
        if (gameMusic) {
            return await fadeVolume(gameMusic, targetVolume, duration);
        }
    },
    // applyLowpassFilter: async (frequency: number): Promise<void> => {
    //     const gameMusic = gameGlobalsStore.getState().musicPlayer;
    //     if (gameMusic) {
    //         const filter = new Tone.Filter({
    //             frequency: frequency,
    //             type: "lowpass",
    //             rolloff: -12
    //         })

    //         gameMusic.disconnect();
    //         gameMusic.connect(filter);
    //         filter.toDestination();
    //     }
    // },
    // removeLowpassFilter: async (): Promise<void> => {
    //     const gameMusic = gameGlobalsStore.getState().musicPlayer;
    //     if (gameMusic) {
    //         //TODO: Remove the filter
    //     }
    // }
}));

const fade = (fadePlate: Graphics, targetAlpha: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
        const startAlpha = fadePlate.alpha;
        const startTime = performance.now();

        const lerp = (t: number) => startAlpha + (targetAlpha - startAlpha) * t;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            fadePlate.alpha = lerp(t);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };

        requestAnimationFrame(animate);
    });
};

const fadeVolume = (audio: Howl, targetVolume: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
        const startVolume = audio.volume();
        const startTime = performance.now();

        const lerp = (t: number) => startVolume + (targetVolume - startVolume) * t;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            audio.volume(lerp(t));

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };

        requestAnimationFrame(animate);
    });
};

export default useFxStore;
