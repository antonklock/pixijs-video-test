import * as PIXI from "pixi.js";
import calculateStageDimensions from "@/utils/calculateStageDimensions";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

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
        .setStrokeStyle({ width: 2, color: 0x000000 })
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


    const coinContainer = new PIXI.Container();
    coinContainer.label = 'coinContainer';
    app.stage.addChild(coinContainer);

    const coinPouchTexture = await PIXI.Assets.load('/images/coin-pouch-128x128.png');
    const coinPouchSprite = new PIXI.Sprite(coinPouchTexture);

    const blackCircle = new PIXI.Graphics()
        .circle(dimensions.width * 0.9, dimensions.height * 0.77, 36)
        .fill({ color: 0x855b1f, alpha: 0.65 })

    // Create a filter for blurring
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.strength = 10;
    blackCircle.filters = [blurFilter];


    coinPouchSprite.x = dimensions.width * 0.9;
    coinPouchSprite.y = dimensions.height * 0.75;
    coinPouchSprite.anchor.set(0.5);
    coinPouchSprite.scale.set(0.75);

    coinPouchSprite.interactive = true;
    coinPouchSprite.cursor = 'hover';

    coinPouchSprite.on('pointerdown', () => {
        console.log("Coin pouch clicked!");
        let coins = gameGlobals.getState().coins;
        if (coins > 9) coins = 9;
        const coinScene = "M" + coins;
        if (coins > 0) {
            console.log("Switching to scene:", coinScene);
            useGameGlobalsStore.getState().switchToScene(coinScene);
        } else {
            console.log("No coins to switch to scene");
        }
    });

    coinContainer.addChild(blackCircle);
    coinContainer.addChild(coinPouchSprite);

    coinContainer.alpha = 0;

    return {
        app,
        canvas,
        dimensions,
        cleanup
    }
};