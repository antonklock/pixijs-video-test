import * as PIXI from "pixi.js";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

function removeAllHitboxes(): void {
    const app = gameGlobals.getState().app;
    app.stage.children.forEach((child: PIXI.Container) => {
        if (child) {
            child.children.forEach((child: PIXI.Container | PIXI.Graphics) => {
                child.destroy();
            });
        }
    });

    gameGlobals.setState({ hitboxes: [] });
}

export default removeAllHitboxes;