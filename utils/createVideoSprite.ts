import * as PIXI from "pixi.js";
import { Warning } from "postcss";

export const createVideoSprite = async (
    video: HTMLVideoElement,
    app: PIXI.Application | undefined
) => {
    try {
        await new Promise<void>((resolve, reject) => {
            if (video.readyState >= 2) {
                resolve();
            } else {
                video.addEventListener("loadeddata", () => resolve(), { once: true });
                video.addEventListener("error", (event) => reject(event.error as Error), { once: true });
            }
        });

        const source = new PIXI.VideoSource({
            resource: video,
            autoPlay: false,
            updateFPS: 30
        });

        const texture = new PIXI.Texture({ source });
        const sprite = new PIXI.Sprite(texture);
        const dimensions = {
            width: app?.stage.width,
            height: app?.stage.height
        }

        sprite.label = "videoSprite";

        if (!dimensions.width || !dimensions.height) throw new Warning("Can't create sprite! App not initialized.");

        sprite.anchor.set(0.5);
        sprite.width = dimensions.width;
        sprite.height = dimensions.height;
        sprite.position.set(dimensions.width / 2, dimensions.height / 2);
        sprite.visible = false;

        if (app?.stage) {
            app.stage.addChild(sprite);
        }

        return sprite;
    } catch (error) {
        console.warn(`%cError creating sprite:`, "color: red; font-weight: bold;", error);
    }
}; 