import * as PIXI from "pixi.js";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

function removeHitboxById(hitboxId: string): void {
    const app = gameGlobals.getState().app;
    const hitboxes = gameGlobals.getState().hitboxes;
    const children = app.stage.children;
    const hitboxContainer: PIXI.Container = children.find((container: PIXI.Container) => (container.label) === hitboxId + "-container");

    if (hitboxContainer) {
        hitboxContainer.children.forEach(child => child.destroy());
        hitboxContainer.destroy();
        hitboxes.splice(hitboxes.indexOf(hitboxContainer), 1);
        gameGlobals.setState({ hitboxes: hitboxes });
    } else {
        console.warn(`Couldn't delete hitbox ${hitboxId + "-container"}! Hitbox not found`);
    }
}

export default removeHitboxById;