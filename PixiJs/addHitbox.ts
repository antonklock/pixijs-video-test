import * as PIXI from "pixi.js";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";
type HitboxConfig = {
    x: number;
    y: number;
    width: number;
    height: number;
    onClick: () => void;
    id: string;
}

function addHitbox(config: HitboxConfig, app: PIXI.Application | undefined) {
    if (!app) return console.warn("Can't add hitbox, app is undefined");

    let hitbox: PIXI.Graphics | null = null;
    const { x, y, width, height, onClick, id } = config;
    const hitboxes = gameGlobals.getState().hitboxes;

    const hitboxExists = hitboxes.find(hitbox => hitbox.label === id);
    if (hitboxExists) return console.warn(`Hitbox with id ${id} already exists`);

    try {
        hitbox = new PIXI.Graphics();
        hitbox.rect(x, y, width, height)
            .fill({ color: 0x00ee00, alpha: 0.1 })
            .stroke({ width: 2, color: 0xFF0000, alpha: 1 });

        hitbox.interactive = true;
        hitbox.on('pointerdown', onClick);
        hitbox.label = id;

        app.stage.addChild(hitbox);

        gameGlobals.getState().hitboxes.push(hitbox);
    } catch (error) {
        const hitbox = hitboxes.find(hitbox => hitbox.label === id);
        if (hitbox) {
            hitbox.destroy();
            hitboxes.splice(hitboxes.indexOf(hitbox), 1);
        }
        console.error("Error adding hitbox", error);
    }

    return hitbox;
}

export default addHitbox;