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
        const hitboxX = app.stage.width * x;
        const hitboxY = app.stage.height * y;
        const hitboxWidth = app.stage.width * width;
        const hitboxHeight = app.stage.height * height;

        const hitboxContainer = new PIXI.Container();
        hitboxContainer.label = name + "-container";
        hitboxContainer.x = hitboxX;
        hitboxContainer.y = hitboxY;
        hitboxContainer.width = hitboxWidth;
        hitboxContainer.height = hitboxHeight;

        hitbox = new PIXI.Graphics();
        const showHitboxes = useDebugStore.getState().showHitboxes;
        hitbox.rect(0, 0, hitboxWidth, hitboxHeight)
            .fill({ color: 0xffffff, alpha: 0.1 })

        hitbox.tint = 0xFF0000;

        hitbox.pivot.set(hitbox.width / 2, hitbox.height / 2);

        hitbox.interactive = true;
        hitbox.alpha = showHitboxes ? 1 : 0;

        hitbox.eventMode = 'static';
        hitbox.on('pointerup', onClick);

        hitbox.label = name;

        const hitboxStroke = new PIXI.Graphics();
        hitboxStroke
            .rect(0, 0, hitboxWidth, hitboxHeight)
            .stroke({ width: 2, color: 0xFF0000 });
        hitboxStroke.pivot.set(hitboxStroke.width / 2, hitboxStroke.height / 2);
        hitboxStroke.label = name + "-stroke";
        hitboxStroke.alpha = showHitboxes ? 1 : 0;

        const labelText = new PIXI.Text({
            text: name,
            style: {
                fontFamily: "Arial",
                fontSize: 12,
                fill: 0xeeeeee,
                align: "center",
            }
        });
        labelText.anchor.set(0.5);
        labelText.alpha = showHitboxes ? 1 : 0;
        labelText.position.set(0, 0 - 10);
        labelText.label = name + "-label";

        const positionText = new PIXI.Text({
            text: `(${x}, ${y})`,
            style: {
                fontFamily: "Arial",
                fontSize: 10,
                fill: 0xeeeeee,
                align: "center",
            }
        });
        positionText.anchor.set(0.5);
        positionText.alpha = showHitboxes ? 1 : 0;
        positionText.label = name + "-position";
        positionText.position.set(0, 0 + 10);

        hitboxContainer.addChild(positionText, labelText, hitbox, hitboxStroke);
        app.stage.addChild(hitboxContainer);

        useGameGlobalsStore.getState().hitboxes.push(hitboxContainer);
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