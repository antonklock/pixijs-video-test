import * as PIXI from "pixi.js";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

function removeHitboxById(): void {
    const app = gameGlobals.getState().app;
    // Iterate through all children of the PIXI stage
    app.stage.children.forEach((child: PIXI.Graphics) => {
        if (child && child.label.includes('HB')) { // Check if the child is a hitbox
            console.log('Removing hitbox: ', child.label);
            child.destroy(); // Destroy the hitbox
        }
    });

    gameGlobals.setState({ hitboxes: [] });

    const hitboxes = app.stage.children.filter((child: PIXI.Graphics) => child.label && child.label.includes('HB'));
    console.log('Hitboxes: ', hitboxes);

    console.log('All hitboxes have been removed from the scene.'); // Log message for confirmation
}

export default removeHitboxById;
