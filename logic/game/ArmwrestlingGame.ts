import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

import useWrestlingStore from "@/stores/wrestling/wrestlingStore";

export default function StartNewArmwrestlingGame() {
    console.log("Arm wrestling game started");

    let lastSwitchTime = 0;
    const switchThreshold = 3;

    let currentScene: "lose" | "tie" | "win" = "tie";

    const interval = setInterval(() => {
        const { strength, wrestlingStarted } = useWrestlingStore.getState();

        if (wrestlingStarted) {
            if (strength <= 0) {
                console.log("Player LOSE");
                useWrestlingStore.setState({ wrestlingStarted: false });

                // TODO: Switch to Lose scene
                useGameGlobalsStore.getState().switchToScene("H3-A-LOSS");
            } else if (strength >= 10) {
                console.log("Player WIN");
                useWrestlingStore.setState({ wrestlingStarted: false });

                // TODO: Switch to Win scene
                useGameGlobalsStore.getState().switchToScene("H3-A-WIN");
            }

            const gameTime = useWrestlingStore.getState().gameTime;
            let gameTimePenalty = gameTime * 0.001;

            if (gameTimePenalty > 0.03) {
                gameTimePenalty = 0.03;
            }

            console.log("currentScene: ", currentScene);

            if (strength < 3) {
                // TODO: Switch to losing scene
                if (gameTime - lastSwitchTime > switchThreshold) {
                    if (currentScene !== "lose") {
                        lastSwitchTime = gameTime;
                        console.log("Switch to losing scene");
                        currentScene = "lose";
                        // TODO: Switch to losing scene
                    }
                } else if (strength < 1) {
                    if (currentScene !== "lose") {
                        lastSwitchTime = gameTime;
                        console.log("Switch to losing scene");
                        currentScene = "lose";
                        // TODO: Switch to losing scene
                    }
                }
            } else if (strength < 7) {
                // TODO: Switch to tie scene
                if (gameTime - lastSwitchTime > switchThreshold) {
                    if (currentScene !== "tie") {
                        lastSwitchTime = gameTime;
                        console.log("Switch to tie scene");
                        currentScene = "tie";
                        // TODO: Switch to tie scene
                    }
                }
            } else {
                // TODO: Switch to winning scene
                if (gameTime - lastSwitchTime > switchThreshold) {
                    if (currentScene !== "win") {
                        lastSwitchTime = gameTime;
                        console.log("Switch to winning scene");
                        currentScene = "win";
                        // TODO: Switch to winning scene
                    }
                }
            }


            useWrestlingStore.setState({ strength: strength - (1 * 0.03 + gameTimePenalty) });
            useWrestlingStore.setState({ gameTime: gameTime + 1 * 0.03 });
        } else {
            clearInterval(interval);
        }
    }, 33);
}