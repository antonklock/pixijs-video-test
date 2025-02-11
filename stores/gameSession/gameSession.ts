import { create } from 'zustand';
import { SceneObject } from '@/types';

interface GameSession {
    startedScenes: Set<string>;
    session: { scene: SceneObject; timeStarted: Date; timeEnded: Date | null }[];
    startScene: (scene: SceneObject, timeStarted: Date) => void;
    endScene: (scene: SceneObject, timeEnded: Date) => void;
    clearSession: () => void;
}

const useGameSessionStore = create<GameSession>((set) => ({
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
