import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";
import * as PIXI from "pixi.js";

const addEndMessage = async (win: "win" | "lose" | "sneek", durationInSeconds: number = 8) => {
    const app = useGameGlobalsStore.getState().app;

    const duration = durationInSeconds * 1000;

    const dimensions = {
        width: app.stage.width,
        height: app.stage.height
    }

    PIXI.Assets.addBundle("fonts", {
        "Leander": "/fonts/Leander.ttf"
    });

    await PIXI.Assets.loadBundle("fonts");

    const winMessages = [
        "Ye won… or I be seein’ double?",
        "Glory’s yersh—now where’d me rum go?",
        "Shiny victory, blurry vision… aye, that be the way!",
        "Ye did it… I think… ah, who cares—cheers!",
        "A toast… to yer winnin’! Or was it mine? What?"
    ]

    const winMessage = winMessages[Math.floor(Math.random() * winMessages.length)];

    const loseMessages = [
        "Ye lost… now grab a mop ‘fore I lose me patience!",
        "No glory, no gold… just ye, a bucket, an’ a lifetime o’ scrubbin’.",
        "While they sail to riches, ye be here washin’ tankards—cheers to that!",
        "Ain’t no treasure fer losers—only dirty floors an’ empty mugs!",
        "Ye fought, ye failed… now get to cleanin’, ya soggy biscuit!"
    ]

    const loseMessage = loseMessages[Math.floor(Math.random() * loseMessages.length)];

    const sneekMessages = [
        "Blast it! Ye slippery eel—where’d ye vanish to?!",
        "That scurvy rat slipped away! I’ll have yer hide yet!",
        "Vanished like a ghost with me gold—cursed be yer cunning!",
        "Aye, ye won… but only ‘cause ye ran faster than me rum runs out!",
        "Gone? That sneaky bilge rat! I’ll find ye yet, mark me words!"
    ];

    const sneekMessage = sneekMessages[Math.floor(Math.random() * sneekMessages.length)];

    const endMessage = new PIXI.Text({
        text: win === "win" ? winMessage : win === "lose" ? loseMessage : sneekMessage,
        style: {
            fontFamily: "Leander",
            fontSize: dimensions.width * 0.025,
            fill: win === "win" ? 0xffffff : win === "lose" ? 0xff0000 : 0xffffff,
            align: "center",
            fontStyle: "italic",
        }
    })

    endMessage.label = "endMessage";
    endMessage.anchor.set(0.5);
    endMessage.position.set(dimensions.width * 0.5, dimensions.height * 0.5);

    endMessage.style.dropShadow = true;
    endMessage.style.dropShadow.color = "#000000";
    endMessage.style.dropShadow.blur = 8;
    endMessage.style.dropShadow.angle = Math.PI / 6;
    endMessage.style.dropShadow.distance = 2;
    endMessage.style.dropShadow.alpha = 0.5;

    app.stage.addChild(endMessage);

    endMessage.alpha = 0;

    endMessage.zIndex = 999999999;

    // Fade in
    const fadeInDuration = 1000;
    const fadeInStartTime = performance.now();

    const fadeIn = (currentTime: number) => {
        const elapsed = currentTime - fadeInStartTime;
        const t = Math.min(elapsed / fadeInDuration, 1);
        endMessage.alpha = t; // Gradually increase alpha to 1

        if (t < 1) {
            requestAnimationFrame(fadeIn);
        } else {
            // After fade in, start fade out
            setTimeout(() => {
                const fadeOutDuration = 1000; // Duration for fade out in milliseconds
                const fadeOutStartTime = performance.now();

                const fadeOut = (currentTime: number) => {
                    const elapsed = currentTime - fadeOutStartTime;
                    const t = Math.min(elapsed / fadeOutDuration, 1);
                    endMessage.alpha = 1 - t; // Gradually decrease alpha to 0

                    if (t < 1) {
                        requestAnimationFrame(fadeOut);
                    } else {
                        app.stage.removeChild(endMessage); // Remove the message after fade out
                    }
                };

                requestAnimationFrame(fadeOut);
            }, duration - fadeInDuration); // Wait for the duration minus fade in time
        }
    };

    requestAnimationFrame(fadeIn);
}

export default addEndMessage;