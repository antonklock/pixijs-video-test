//O1 - 3   ||  P1 - 2
//O2 - 5   ||  P2 - 5
//03 - 6   ||  P3 - 8
//O4 - 8   ||  P4 - 8
//O5 - 10  ||  P5 - 11
//O6 - 11  ||  P6 - 12

interface DiceScenes {
    opponent: string;
    player: string;
}

const getRandomDiceScenes = (diceScenes: DiceScenes) => {
    const randomOpponantScene = diceScenes.opponent;
    const randomPlayerScene = diceScenes.player;

    const sceneValues: { [key in DiceScenes["opponent"] | DiceScenes["player"]]: number } = {
        "H2-A-O1": 3,
        "H2-A-O2": 5,
        "H2-A-O3": 6,
        "H2-A-O4": 8,
        "H2-A-O5": 10,
        "H2-A-O6": 11,
        "H2-A-P1": 2,
        "H2-A-P2": 5,
        "H2-A-P3": 8,
        "H2-A-P4": 8,
        "H2-A-P5": 10,
        "H2-A-P6": 12,
    };

    const opponentValue = sceneValues[randomOpponantScene as keyof typeof sceneValues];
    const playerValue = sceneValues[randomPlayerScene as keyof typeof sceneValues];

    if (opponentValue > playerValue) {
        return [`H2-A-${randomOpponantScene}`, `H2-A-${randomPlayerScene}-LOSS`];
    } else {
        return [`H2-A-${randomOpponantScene}`, `H2-A-${randomPlayerScene}-WIN`];
    }
};

const getRandomOpponentDiceScene = () => {
    const opponantScenes = ["H2-A-O1", "H2-A-O2", "H2-A-O3", "H2-A-O4", "H2-A-O5", "H2-A-O6"];
    return opponantScenes[Math.floor(Math.random() * opponantScenes.length)];
}

const getRandomPlayerDiceScene = () => {
    const playerScenes = ["H2-A-P1", "H2-A-P2", "H2-A-P3", "H2-A-P4", "H2-A-P5", "H2-A-P6"];
    return playerScenes[Math.floor(Math.random() * playerScenes.length)];
}

const calculateDiceWinner = (diceScenes: DiceScenes) => {
    const randomOpponantScene = diceScenes.opponent;
    const randomPlayerScene = diceScenes.player;

    const sceneValues: { [key in DiceScenes["opponent"] | DiceScenes["player"]]: number } = {
        "H2-A-O1": 3,
        "H2-A-O2": 5,
        "H2-A-O3": 6,
        "H2-A-O4": 8,
        "H2-A-O5": 10,
        "H2-A-O6": 11,
        "H2-A-P1": 2,
        "H2-A-P2": 5,
        "H2-A-P3": 8,
        "H2-A-P4": 8,
        "H2-A-P5": 10,
        "H2-A-P6": 12,
    };

    const opponentValue = sceneValues[randomOpponantScene as keyof typeof sceneValues];
    const playerValue = sceneValues[randomPlayerScene as keyof typeof sceneValues];

    return [`${randomPlayerScene}${opponentValue > playerValue ? '-LOSS' : '-WIN'}`];
};

export { calculateDiceWinner, getRandomOpponentDiceScene, getRandomPlayerDiceScene };