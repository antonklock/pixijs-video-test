'use server';

import { createClient } from "@/supabase/supabaseServer";
import { GameSession, Metadata, PerformanceMetrics } from '@/types';

interface SerializedGameSession extends Omit<GameSession, 'clearSession' | 'startedScenes'> {
    startedScenes: string[];
    metadata: Metadata;
    performanceMetrics: PerformanceMetrics;
}

export async function saveGameSessionAction(
    gameSession: SerializedGameSession
): Promise<{ success: boolean; error?: string }> {
    try {
        const filteredSession = gameSession.session.map((session) => ({
            scene: {
                id: session.scene.id,
                source: session.scene.source,
                name: session.scene.name,
            },
            time_started: session.timeStarted,
            time_ended: session.timeEnded,
        }));

        const supabase = await createClient();
        const { data, error } = await supabase
            .from('game_sessions')
            .upsert([{
                id: gameSession.id,
                started_scenes: Array.from(gameSession.startedScenes),
                session: filteredSession,
                metadata: gameSession.metadata,
                performance_metrics: gameSession.performanceMetrics,
            }]);

        if (error) {
            console.error('Error saving game session:', error);
            return { success: false, error: error.message };
        }

        console.log('Game session saved successfully');

        return { success: true };
    } catch (error) {
        console.error('Failed to save game session:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}