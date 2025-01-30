import * as PIXI from "pixi.js";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

function removeHitboxById(hitboxId: string): void {
    const hitboxes = gameGlobals.getState().hitboxes;
    const hitbox: PIXI.Graphics | undefined = hitboxes.find(hitbox => (hitbox.label as string) === hitboxId);

    if (hitbox) {
        hitbox.destroy();
        hitboxes.splice(hitboxes.indexOf(hitbox), 1);
        gameGlobals.setState({ hitboxes: hitboxes });
    } else {
        console.warn(`Couldn't delete hitbox ${hitboxId}! Hitbox not found`);
    }
}

export default removeHitboxById;
