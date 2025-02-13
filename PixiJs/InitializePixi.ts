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
        // resolution: window.devicePixelRatio || 1,
        resolution: 1,
        autoDensity: false,
    });

    await PIXI.Assets.load([
        '/cursors/wood/cursor-pointer.png',
        '/cursors/wood/cursor-hover.png',
    ]);

    const defaultCursor = '/cursors/wood/cursor-pointer.png';
    const pointerCursor = '/cursors/wood/cursor-hover.png';

    app.renderer.events.cursorStyles.default = defaultCursor;
    app.renderer.events.cursorStyles.hover = pointerCursor;

    // app.canvas.style.cursor = 'none';

    // // Create a cursor sprite that follows the mouse
    // const cursor = PIXI.Sprite.from(defaultCursor);
    // cursor.anchor.set(0.5);
    // cursor.scale.set(0.25);
    // cursor.zIndex = 1000000; // Ensure cursor is always on top
    // app.stage.addChild(cursor);

    // // Update cursor position on pointer move
    // app.stage.eventMode = 'static';
    // app.stage.on('pointermove', (event) => {
    //     cursor.position.copyFrom(event.global);
    // });

    const canvas = app.canvas;

    // Stage outline
    // const debugRect = new PIXI.Graphics()
    //     .setStrokeStyle({ width: 2, color: 0xff0000 })
    //     .rect(0, 0, app.stage.width - 2, app.stage.height - 2)
    //     .stroke();
    // debugRect.zIndex = 999999999;
    // app.stage.addChild(debugRect);

    return {
        app,
        canvas
    }
};