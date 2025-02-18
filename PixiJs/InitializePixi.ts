import * as PIXI from "pixi.js";
import calculateStageDimensions from "@/utils/calculateStageDimensions";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";

export const initializePixi = async () => {
    console.log("Initializing Pixi");

    const dimensions = calculateStageDimensions();

    const app = new PIXI.Application();
    await app.init({
        background: new PIXI.Color({ r: 0, g: 0, b: 0, a: 0 }).toArray(),
        backgroundAlpha: 0,
        width: dimensions.width,
        height: dimensions.height,
        antialias: true,
        resolution: 1,
        autoDensity: true,
    });

    const canvas = app.canvas;

    // Load cursor textures
    await PIXI.Assets.load(['/cursors/wood/32x32/cursor-arrow-32.png', '/cursors/wood/32x32/cursor-pointer-32.png']).then(() => {
        app.renderer.events.cursorStyles.default = 'url("/cursors/wood/32x32/cursor-arrow-32.png"), auto';
        app.renderer.events.cursorStyles.hover = 'url("/cursors/wood/32x32/cursor-pointer-32.png"), auto';
    });

    const resizeStage = () => {
        const dimensions = calculateStageDimensions();

        // Update the canvas size
        app.renderer.resize(dimensions.width, dimensions.height);

        // Update the stage size
        app.stage.width = dimensions.width;
        app.stage.height = dimensions.height;
    };

    // Stage outline
    const debugRect = new PIXI.Graphics()
        .setStrokeStyle({ width: 2, color: 0xff0000 })
        .rect(0, 0, dimensions.width, dimensions.height)
        .stroke();
    debugRect.zIndex = 999999999;
    app.stage.addChild(debugRect);

    window.addEventListener('resize', resizeStage);

    // Clean up function
    const cleanup = () => {
        window.removeEventListener('resize', resizeStage);
        app.destroy(true);
    };

    gameGlobals.getState().setCleanup(cleanup);

    return {
        app,
        canvas,
        dimensions,
        cleanup
    }
};