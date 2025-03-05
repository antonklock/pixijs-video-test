import * as PIXI from "pixi.js";
import calculateStageDimensions from "@/utils/calculateStageDimensions";
import gameGlobals from "@/stores/gameGlobals/gameGlobals";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

interface InitializePixiProps {
    parentElement: HTMLDivElement;
}

export const initializePixi = async (props: InitializePixiProps) => {
    // console.log("Initializing Pixi");

    const dimensions = calculateStageDimensions();
    const parentElement = props.parentElement;

    const app = new PIXI.Application();
    await app.init({
        background: new PIXI.Color({ r: 0, g: 0, b: 0, a: 0 }).toArray(),
        backgroundAlpha: 0,
        resizeTo: parentElement,
        antialias: true,
        resolution: 2,
        autoDensity: true,
    });

    const canvas = app.canvas;

    // Load cursor textures
    await PIXI.Assets.load(['/cursors/wood/32x32/cursor-arrow-32.png', '/cursors/wood/32x32/cursor-pointer-32.png']).then(() => {
        app.renderer.events.cursorStyles.default = 'url("/cursors/wood/32x32/cursor-arrow-32.png"), auto';
        app.renderer.events.cursorStyles.hover = 'url("/cursors/wood/32x32/cursor-pointer-32.png"), auto';
    });

    // const dimensionsText = new PIXI.Text({
    //     text: `stage.width: ${dimensions.width} x stage.height: ${dimensions.height}`,
    //     style: {
    //         fontFamily: "Arial",
    //         fontSize: 12,
    //         fill: 0xeeeeee,
    //         align: "center",
    //     }
    // });
    // dimensionsText.label = "dimensionsText";
    // dimensionsText.position.set(0 + dimensionsText.width / 2, 0 + dimensionsText.height / 2);
    // app.stage.addChild(dimensionsText);

    // Stage outline
    const debugRect = new PIXI.Graphics()
        .setStrokeStyle({ width: 2, color: 0x000000, alpha: 0.1 })
        .rect(0, 0, dimensions.width, dimensions.height)
        .stroke();
    debugRect.zIndex = 999999999;
    app.stage.addChild(debugRect);

    // Resize the stage when the window is resized
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

    const bgCircle = new PIXI.Graphics()
        .circle(dimensions.width * 0.1, dimensions.height * 0.77, dimensions.width * 0.1 * 0.30)
        .fill({ color: 0xeecc88, alpha: 1 })

    // Create a filter for blurring
    const blurFilter = new PIXI.BlurFilter();
    blurFilter.strength = 25;
    bgCircle.filters = [blurFilter];

    bgCircle.interactive = false;
    bgCircle.cursor = 'default';

    coinPouchSprite.interactive = false;
    coinPouchSprite.cursor = 'default';

    coinPouchSprite.x = dimensions.width * 0.1;
    coinPouchSprite.y = dimensions.height * 0.75;
    coinPouchSprite.anchor.set(0.5);
    const coinPouchSpriteStartScale = (dimensions.width * 0.01) * 0.075;
    coinPouchSprite.scale.set(coinPouchSpriteStartScale);

    bgCircle.alpha = 0.65;

    coinContainer.on("pointerover", () => {
        const animateGraphic = () => {
            const animateBgCircle = bgCircle.alpha < 1;
            const animatePouch = coinPouchSprite.scale.x < coinPouchSpriteStartScale * 1.05;
            if (animatePouch) {
                coinPouchSprite.scale.set(coinPouchSprite.scale.x + 0.01);
            }
            if (animateBgCircle) {
                bgCircle.alpha += 0.05;
            }

            if (animatePouch || animateBgCircle) requestAnimationFrame(animateGraphic);
        }

        animateGraphic();
    });

    coinContainer.on("pointerout", () => {
        const animateGraphic = () => {
            const animateBgCircle = bgCircle.alpha > 0.65;
            const animatePouch = coinPouchSprite.scale.x > coinPouchSpriteStartScale;
            if (animatePouch) {
                coinPouchSprite.scale.set(coinPouchSprite.scale.x - 0.01);
            }
            if (animateBgCircle) {
                bgCircle.alpha -= 0.05;
            }

            if (animatePouch || animateBgCircle) requestAnimationFrame(animateGraphic);
        }

        animateGraphic();
    })

    coinContainer.on('pointerdown', () => {
        // console.log("Coin pouch clicked!");
        let coins = gameGlobals.getState().coins;
        if (coins > 9) coins = 9;
        const coinScene = "M" + coins;
        if (coins >= 0) {
            // console.log("Switching to scene:", coinScene);
            useGameGlobalsStore.getState().switchToScene(coinScene, false);
        }

        if (coinContainer && coinContainer.alpha > 0) {
            coinContainer.alpha = 1;
            const fadeOut = () => {
                if (coinContainer.alpha > 0) {
                    coinContainer.alpha -= 0.1;
                    requestAnimationFrame(fadeOut);
                } else {
                    coinContainer.interactive = false;
                    coinContainer.cursor = "default";

                    // console.log("Coin container faded out");
                    coinPouchSprite.scale.set(coinPouchSpriteStartScale);
                    bgCircle.alpha = 0.65;
                }
            };
            fadeOut();
        }
    });

    coinContainer.addChild(bgCircle);
    coinContainer.addChild(coinPouchSprite);

    coinContainer.alpha = 0;
    coinContainer.interactive = true;
    coinContainer.cursor = 'hover';

    return {
        app,
        canvas,
        dimensions,
        cleanup
    }
};

export const shouldStageResize = (app: PIXI.Application) => {
    const videoElement = useGameGlobalsStore.getState().currentScene?.video.player;
    if (!videoElement) return false;
    const shouldResize = videoElement.clientWidth !== app.renderer.width || videoElement.clientHeight !== app.renderer.height;
    // console.log("Should resize: ", shouldResize);
    return shouldResize;
}

export const resizeStage = () => {
    // TODO: Implement resize stage
    location.reload();
};