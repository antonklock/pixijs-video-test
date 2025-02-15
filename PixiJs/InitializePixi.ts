import * as PIXI from "pixi.js";

export const initializePixi = async (dimensions: { width: number; height: number }) => {
    console.log("Initializing Pixi");

    const app = new PIXI.Application();
    await app.init({
        background: new PIXI.Color({ r: 0, g: 0, b: 0, a: 1 }).toArray(),
        width: dimensions.width,
        height: dimensions.height,
        // width: 600,
        // height: 300,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        // resolution: 0.5,
        autoDensity: true,
    });

    const canvas = app.canvas;

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