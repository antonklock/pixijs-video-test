import * as PIXI from "pixi.js";
import ybpLogo from "@/public/logos/ybp-Logo-white-256.png";

export const initializePixi = async (dimensions: { width: number; height: number }) => {
    const app = new PIXI.Application();
    await app.init({
        // background: new PIXI.Color({ r: 0, g: 25, b: 25, a: 0.5 }).toArray(),
        background: new PIXI.Color({ r: 0, g: 0, b: 0, a: 1 }).toArray(),
        width: dimensions.width,
        height: dimensions.height,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    const canvas = app.canvas;

    // const texture = await PIXI.Assets.load(ybpLogo.src);

    // const ybpLogoSprite = new PIXI.Sprite(texture);
    // ybpLogoSprite.width = 100;
    // ybpLogoSprite.height = 100;
    // ybpLogoSprite.anchor.set(0.5);
    // ybpLogoSprite.alpha = 0.75;
    // app.stage.addChild(ybpLogoSprite);

    // const noVideosText = new PIXI.Text({
    //     text: "Something went wrong...",
    //     style: {
    //         fontFamily: "Cursive, 'Brush Script MT'",
    //         fontSize: 24,
    //         fill: 0xDDDDDD,
    //         align: "center",
    //     },
    // });

    // noVideosText.anchor.set(0.5);

    // const container = new PIXI.Container();
    // container.addChild(noVideosText);
    // container.addChild(ybpLogoSprite);
    // app.stage.addChild(container);

    // container.pivot.set(container.width / 2, container.height / 2);
    // container.position.set(dimensions.width / 2 - ybpLogoSprite.width / 2 + noVideosText.width / 2, dimensions.height / 2 + container.height / 2);

    // noVideosText.position.set(+noVideosText.width / 2, 0);
    // ybpLogoSprite.position.set(-noVideosText.width / 4, 0);

    // Stage outline
    const debugRect = new PIXI.Graphics()
        .setStrokeStyle({ width: 2, color: 0x000000 })
        .rect(0, 0, dimensions.width, dimensions.height)
        .stroke();
    app.stage.addChild(debugRect);

    return {
        app,
        canvas
    }
};