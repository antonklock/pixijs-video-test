import * as PIXI from "pixi.js";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

function updateExistingHitboxes(width: number, height: number) {
    const app = useGameGlobalsStore.getState().app;
    if (!app) {
        console.warn("No PIXI application found.");
        return;
    }

    console.log("Updating existing hitboxes");

    // const hitboxes = useGameGlobalsStore.getState().hitboxes;
    const hitboxes = useGameGlobalsStore.getState().stagedScenes.map(scene => scene.hitboxes).flat();
    console.log("Hitboxes: ", hitboxes);

    app.stage.children.forEach((child: PIXI.Container | PIXI.Graphics) => {
        if (!child.label) return;
        if (typeof (child.label) !== "string") return;
        if (child instanceof PIXI.Container && child.label.includes("-container")) {
            console.log("Child: ", child.label);

            // const hitboxSceneName = child.label.slice(3).split("-")[0];
            const hitboxSceneName = "HB-" + child.label.split("-")[1];
            console.log("Hitbox scene name: ", hitboxSceneName);

            const hitbox = hitboxes.find(hitbox => hitbox.name === hitboxSceneName);
            if (!hitbox) return console.warn(`Hitbox with id ${hitboxSceneName} not found in hitboxes array:`, hitboxes);

            child.x = width * hitbox.x;
            child.y = height * hitbox.y;
            child.width = width * hitbox.width;
            child.height = height * hitbox.height;
            console.log("hitbox.x: ", hitbox.x, " - hitbox.y: ", hitbox.y, " - hitbox.width: ", hitbox.width, " - hitbox.height: ", hitbox.height);
            console.log("Child: ", child.label, " - ", child.x, child.y, child.width, child.height);
        }
    });

    app.stage.children.forEach((child: PIXI.Container | PIXI.Graphics) => {
        if (!child.label) return;
        if (typeof (child.label) !== "string") return;
        if (child instanceof PIXI.Text && child.label === "dimensionsText") {
            const width = app.stage.width.toFixed(2);
            const height = app.stage.height.toFixed(2);

            const canvasDimensions = app.renderer.canvas.getBoundingClientRect();

            child.text = `stage.width: ${width} x stage.height: ${height} - canvas.width: ${canvasDimensions.width} x canvas.height: ${canvasDimensions.height}`;
        }
    });
}

function updateFadePlate() {
    const app = useGameGlobalsStore.getState().app;
    if (!app) {
        console.warn("No PIXI application found.");
        return;
    }

    const fadePlate = app.stage.children.find((child: PIXI.Container | PIXI.Graphics) => child instanceof PIXI.Container && child.label === "fadePlate");
    if (!fadePlate) return console.warn("Fade plate not found");

    console.log("Fade plate found");

    fadePlate.pivot.set(fadePlate.width / 2, fadePlate.height / 2);
    fadePlate.x = app.stage.width / 2;
    fadePlate.y = app.stage.height / 2;
    fadePlate.width = app.stage.width;
    fadePlate.height = app.stage.height;
}

export { updateExistingHitboxes, updateFadePlate };
