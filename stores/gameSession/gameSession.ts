import { create } from 'zustand';
import { GameSession } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const useGameSessionStore = create<GameSession>((set) => ({
    id: uuidv4(),
    userToken: "",
    startedScenes: new Set(),
    session: [],
    startScene: (scene, timeStarted) =>
        set((state) => ({
            session: [...state.session, { scene, timeStarted, timeEnded: null }],
            startedScenes: state.startedScenes.add(scene.id),
        })),
    endScene: (sceneToEnd, timeEnded) =>
        set((state) => ({
            session: state.session.map((sessionScene) =>
                sessionScene.scene.id === sceneToEnd.id ? { ...sessionScene, timeEnded } : sessionScene
            ),
        })),
    clearSession: () => set({ session: [] }),
}));

export default useGameSessionStore;
