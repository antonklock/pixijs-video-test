import * as PIXI from "pixi.js";

export const initializePixi = async (dimensions: { width: number; height: number }) => {
    console.log("Initializing Pixi");

    const app = new PIXI.Application();
    await app.init({
        background: new PIXI.Color({ r: 0, g: 0, b: 0, a: 0 }).toArray(),
        backgroundAlpha: 0,
        width: dimensions.width,
        height: dimensions.height,
        // width: 600,
        // height: 300,
        antialias: true,
        // resolution: window.devicePixelRatio || 1,
        resolution: 1,
        autoDensity: true,
    });

    const canvas = app.canvas;

    // Load textures
    await PIXI.Assets.load(['/cursors/wood/32x32/cursor-arrow-32.png', '/cursors/wood/32x32/cursor-pointer-32.png']).then(() => {
        app.renderer.events.cursorStyles.default = 'url("/cursors/wood/32x32/cursor-arrow-32.png"), auto';
        app.renderer.events.cursorStyles.hover = 'url("/cursors/wood/32x32/cursor-pointer-32.png"), auto';
    });

    // Stage outline
    const debugRect = new PIXI.Graphics()
        .setStrokeStyle({ width: 2, color: 0xff0000 })
        .rect(0, 0, app.stage.width - 2, app.stage.height - 2)
        .stroke();
    debugRect.zIndex = 999999999;
    app.stage.addChild(debugRect);

    return {
        app,
        canvas
    }
};