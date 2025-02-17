import { create } from "zustand";
import gameGlobalsStore from "../gameGlobals/gameGlobals";
import { Graphics } from "pixi.js";
import * as Tone from "tone";

interface FxStore {
    initiateFadePlate: () => void;
    isFaded: boolean;
    // setFadeToBlack: (value: boolean) => void;
    fadeToBlack: (duration: number) => Promise<void>;
    unfadeToBlack: (duration: number) => Promise<void>;
    fadeMusicVolume: (targetVolume: number, duration: number) => Promise<void>;
}

const useFxStore = create<FxStore>((set) => ({
    initiateFadePlate: async () => {
        set({ isFaded: false });
        if (gameGlobalsStore.getState().app) {
            const fadePlate = new Graphics();
            fadePlate.label = "fadePlate";
            fadePlate.rect(0, 0, gameGlobalsStore.getState().app.screen.width, gameGlobalsStore.getState().app.screen.height);
            fadePlate.fill({ color: 0x000000 });
            fadePlate.alpha = 0;
            fadePlate.zIndex = 9999999999;
            gameGlobalsStore.getState().app.stage.addChild(fadePlate);
        }
    },
    isFaded: false,
    fadeToBlack: async (duration: number): Promise<void> => {
        console.log("Fading to black");
        const fadePlate = gameGlobalsStore.getState().app.stage.children.find((child: Graphics) => child.label === "fadePlate");
        if (fadePlate) {
            return await fade(fadePlate, 1, duration);
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

const fadeVolume = (audio: Tone.Player, targetVolume: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
        const startVolume = audio.volume.value;
        const startTime = performance.now();

        const lerp = (t: number) => startVolume + (targetVolume - startVolume) * t;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            audio.volume.value = lerp(t);

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
