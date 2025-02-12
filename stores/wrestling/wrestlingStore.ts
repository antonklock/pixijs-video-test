import StartNewArmwrestlingGame from '@/logic/game/ArmwrestlingGame';
import { create } from 'zustand';

interface WrestlingStore {
    handicap: number;
    wrestlingStarted: boolean;
    strength: number;
    gameTime: number;
    onClick: () => void;
    startGame: () => void;
    resetGame: () => void;
}

const useWrestlingStore = create<WrestlingStore>((set, get) => ({
    handicap: 0,
    gameTime: 0,
    wrestlingStarted: false,
    startGame: () => {
        StartNewArmwrestlingGame();
        set({ wrestlingStarted: true });
    },
    strength: 5,
    onClick: () => {
        if (!get().wrestlingStarted) {
            set({ wrestlingStarted: true });
            return;
        } else {
            console.log("Wrestling already started, no need to set wrestlingStarted to true again!");
        }

        let handicap = get().handicap;
        const gameTime = get().gameTime;

        if (get().strength < 2 && handicap < 0.2) {
            handicap += 0.1;
        } else if (get().strength > 2 && handicap >= 0.2) {
            handicap -= 0.1;
        }

        if (gameTime > 15) {
            handicap += 0.005;
        } else if (gameTime > 10) {
            handicap += 0.002;
        } else if (gameTime > 5) {
            handicap += 0.001;
        }

        set({ strength: get().strength + 0.15 + handicap, handicap: handicap });
    },
    resetGame: () => {
        set({ strength: 5, handicap: 0, gameTime: 0, wrestlingStarted: false });
    }
}));

export default useWrestlingStore;
