import * as PIXI from "pixi.js";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

function removeAllHitboxes(): void {
    const app = gameGlobals.getState().app;
    app.stage.children.forEach((child: PIXI.Container) => {
        child.children.forEach((child: PIXI.Container | PIXI.Graphics) => {
            if (child.label && child.label.includes("HB")) {
                child.destroy();
            }
        });

        if (child.label && child.label.includes("HB")) {
            child.destroy();
        }
    });

    gameGlobals.setState({ hitboxes: [] });
}

export default removeAllHitboxes;