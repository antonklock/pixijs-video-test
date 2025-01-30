import * as PIXI from "pixi.js";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import useDebugStore from "@/stores/debug/debugStore";

type HitboxConfig = {
    x: number;
    y: number;
    width: number;
    height: number;
    onClick: () => void;
    name: string;
}

function addHitbox(config: HitboxConfig) {
    const app = useGameGlobalsStore.getState().app;
    if (!app) return console.warn("Can't add hitbox, app is undefined");

    let hitbox: PIXI.Graphics | null = null;
    const { x, y, width, height, onClick, name } = config;
    const hitboxes = useGameGlobalsStore.getState().hitboxes;

    const hitboxExists = hitboxes.find(hitbox => hitbox.label === name);
    if (hitboxExists) return console.warn(`Hitbox with id ${name} already exists`);

    try {
        hitbox = new PIXI.Graphics();
        const showHitboxes = useDebugStore.getState().showHitboxes;
        hitbox.rect(app.stage.width * x, app.stage.height * y, app.stage.width * width, app.stage.height * height)
            .fill({ color: 0x00ee00, alpha: showHitboxes ? 0.1 : 0 })
            .stroke({ width: 2, color: 0xFF0000, alpha: showHitboxes ? 1 : 0 });

        hitbox.interactive = true;
        hitbox.on('pointerdown', onClick);
        hitbox.label = name;

        const labelText = new PIXI.Text({
            text: name,
            style: {
                fontFamily: "Arial",
                fontSize: 12,
                fill: 0xeeeeee,
                align: "center",
            },
        });
        labelText.anchor.set(0.5);
        labelText.position.set(app.stage.width * x + app.stage.width * width / 2, app.stage.height * y + app.stage.height * height / 2);
        hitbox.addChild(labelText);

        app.stage.addChild(hitbox);
        useGameGlobalsStore.getState().hitboxes.push(hitbox);
    } catch (error) {
        const hitbox = hitboxes.find(hitbox => hitbox.label === name);
        if (hitbox) {
            hitbox.destroy();
            hitboxes.splice(hitboxes.indexOf(hitbox), 1);
        }
        console.error("Error adding hitbox", error);
    }

    return hitbox;
}

export default addHitbox;