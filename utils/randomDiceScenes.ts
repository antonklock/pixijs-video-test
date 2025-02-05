//O1 - 3   ||  P1 - 2
//O2 - 5   ||  P2 - 5
//03 - 6   ||  P3 - 8
//O4 - 8   ||  P4 - 8
//O5 - 10  ||  P5 - 11
//O6 - 11  ||  P6 - 12

const getRandomDiceScene = () => {
    const opponantScenes = ["O1", "O2", "O3", "O4", "O5", "O6"];
    const playerScenes = ["P1", "P2", "P3", "P4", "P5", "P6"];

    const randomOpponantScene = opponantScenes[Math.floor(Math.random() * opponantScenes.length)];
    const randomPlayerScene = playerScenes[Math.floor(Math.random() * playerScenes.length)];

    const sceneValues: { [key in 'O1' | 'O2' | 'O3' | 'O4' | 'O5' | 'O6' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6']: number } = {
        O1: 3,
        O2: 5,
        O3: 6,
        O4: 8,
        O5: 10,
        O6: 11,
        P1: 2,
        P2: 5,
        P3: 8,
        P4: 8,
        P5: 10,
        P6: 12,
    };

    const opponentValue = sceneValues[randomOpponantScene as keyof typeof sceneValues];
    const playerValue = sceneValues[randomPlayerScene as keyof typeof sceneValues];

    if (opponentValue > playerValue) {
        return [`H2-A-${randomOpponantScene}`, `H2-A-${randomPlayerScene}-LOSS`];
    } else {
        return [`H2-A-${randomOpponantScene}`, `H2-A-${randomPlayerScene}-WIN`];
    }
};

export default getRandomDiceScene;
