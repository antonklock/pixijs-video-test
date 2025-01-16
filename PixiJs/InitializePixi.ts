import * as PIXI from "pixi.js";

export const initializePixi = async (dimensions?: { width: number; height: number }) => {
    // Default dimensions if none provided
    const defaultDimensions = {
        width: 1280,
        height: 720
    };

    const config = dimensions || defaultDimensions;

    const app = new PIXI.Application();
    await app.init({
        background: new PIXI.Color({ r: 0, g: 25, b: 25, a: 0.5 }).toArray(),
        width: config.width,
        height: config.height,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    const canvas = app.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.objectFit = "contain";

    const noVideosText = new PIXI.Text({
        text: "No videos loaded...",
        style: {
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0xff1010,
            align: "center",
        },
    });
    noVideosText.anchor.set(0.5);
    noVideosText.position.set(config.width / 2, config.height / 2);
    app.stage.addChild(noVideosText);

    const debugRect = new PIXI.Graphics()
        .setStrokeStyle({ width: 2, color: 0xff0000 })
        .rect(0, 0, config.width, config.height)
        .stroke();
    app.stage.addChild(debugRect);

    return {
        app,
        canvas
    }
};