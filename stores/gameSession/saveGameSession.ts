// utils/saveGameSession.ts
import { PostgrestResponse } from '@supabase/supabase-js';
import { createClient } from "@/supabase/supabaseServer";

import Hls from 'hls.js';
import * as PIXI from 'pixi.js';

interface Hitbox {
    name: string;
    color: number;
    x: number;
    y: number;
    width: number;
    height: number;
    onHit: () => void;
    isLoaded: boolean;
    isActive: boolean;
    activationIntervals: {
        start: number;
        end: number;
    }[];
}

// Define the types for GameSession and SceneObject if not already defined
interface SceneObject {
    id: string;
    name?: string;
    source: {
        mux: string;
        cloudflare: string;
        R2: string;
    };
    video: {
        player: HTMLVideoElement | null;
        hls: Hls | null;
        sprite: PIXI.Sprite | null;
    };
    nextScenes: string[];
    autoplay?: boolean;
    sceneEvents?: SceneEvent[];
    hitboxes: Hitbox[];
    customProperties?: {
        [key: string]: string | number | boolean;
    };
}

interface SceneEvent {
    name: string;
    triggerTime: number;
    runEvent: () => void;
}

interface GameSession {
    startedScenes: Set<string>;
    session: { scene: SceneObject; timeStarted: Date; timeEnded: Date | null }[];
    startScene: (scene: SceneObject, timeStarted: Date) => void;
    endScene: (scene: SceneObject, timeEnded: Date) => void;
    clearSession: () => void;
}

export async function saveGameSession(gameSession: GameSession): Promise<PostgrestResponse<any> | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('game_sessions')
        .insert([{
            started_scenes: Array.from(gameSession.startedScenes),
            session: gameSession.session
        }]);

    if (error) {
        console.error('Error saving game session:', error);
        return null;
    }

    return data;
}

export default saveGameSession;
