import useGameSessionStore from "@/stores/gameSession/gameSession";

// type CombinationRow = {
//     combination: number;
//     scenes: string[];
// };

// const table: CombinationRow[] = [
//     { combination: 1, scenes: [] },
//     { combination: 2, scenes: ["H1"] },
//     { combination: 3, scenes: ["H1", "H4"] },
//     { combination: 4, scenes: ["H4"] },
//     { combination: 5, scenes: ["H2", "H1", "H4"] },
//     { combination: 6, scenes: ["H2", "H1"] },
//     { combination: 7, scenes: ["H2", "H4"] },
//     { combination: 8, scenes: ["H2"] },
//     { combination: 9, scenes: ["H2", "H3", "H1"] },
//     { combination: 10, scenes: ["H2", "H3", "H4"] },
//     { combination: 11, scenes: ["H2", "H3"] },
//     { combination: 12, scenes: ["H3", "H1", "H4"] },
//     { combination: 13, scenes: ["H3", "H1"] },
//     { combination: 14, scenes: ["H3", "H4"] },
//     { combination: 15, scenes: ["H3"] },
//     { combination: 16, scenes: ["H2", "H3", "H1", "H4"] },
// ];

// function determineHub(): string {
//     const startedScenes = useGameSessionStore.getState().startedScenes;
//     let bestMatch = 1;

//     for (const row of table) {
//         if (row.scenes.every(scene => startedScenes.has(scene))) {
//             bestMatch = Math.max(bestMatch, row.combination);
//         }
//     }
//     return "H0-" + bestMatch;
// }

function determineHub() {
    const startedScenes = useGameSessionStore.getState().startedScenes;

    if (!startedScenes.has("H2") && !startedScenes.has("H3") && !startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-1";
    if (!startedScenes.has("H2") && !startedScenes.has("H3") && startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-2";
    if (!startedScenes.has("H2") && !startedScenes.has("H3") && startedScenes.has("H1") && startedScenes.has("H4")) return "H0-3";
    if (!startedScenes.has("H2") && !startedScenes.has("H3") && !startedScenes.has("H1") && startedScenes.has("H4")) return "H0-4";
    if (startedScenes.has("H2") && !startedScenes.has("H3") && startedScenes.has("H1") && startedScenes.has("H4")) return "H0-5";
    if (startedScenes.has("H2") && !startedScenes.has("H3") && startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-6";
    if (startedScenes.has("H2") && !startedScenes.has("H3") && !startedScenes.has("H1") && startedScenes.has("H4")) return "H0-7";
    if (startedScenes.has("H2") && !startedScenes.has("H3") && !startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-16";
    if (startedScenes.has("H2") && startedScenes.has("H3") && startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-8";
    if (startedScenes.has("H2") && startedScenes.has("H3") && !startedScenes.has("H1") && startedScenes.has("H4")) return "H0-9";
    if (startedScenes.has("H2") && startedScenes.has("H3") && !startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-10";
    if (!startedScenes.has("H2") && startedScenes.has("H3") && startedScenes.has("H1") && startedScenes.has("H4")) return "H0-11";
    if (!startedScenes.has("H2") && startedScenes.has("H3") && startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-12";
    if (!startedScenes.has("H2") && startedScenes.has("H3") && !startedScenes.has("H1") && startedScenes.has("H4")) return "H0-13";
    if (!startedScenes.has("H2") && startedScenes.has("H3") && !startedScenes.has("H1") && !startedScenes.has("H4")) return "H0-14";
    if (startedScenes.has("H2") && startedScenes.has("H3") && startedScenes.has("H1") && startedScenes.has("H4")) return "H0-15";

    return "H0-1";
}

export default determineHub;