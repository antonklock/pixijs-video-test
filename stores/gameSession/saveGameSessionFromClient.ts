'use client'

import { GameSession, Metadata, PerformanceMetrics } from "@/types"
import { saveGameSessionAction } from "./saveGameSessionAction"
import useSaveGameStore from "./saveGameStore";
import { v4 as uuidv4 } from 'uuid';

export async function saveGameSessionFromClient(gameSession: GameSession) {
    try {
        useSaveGameStore.getState().setIsSaving(true);

        let token = localStorage.getItem("ybp-user-token");
        if (!token) {
            token = uuidv4();
            localStorage.setItem("ybp-user-token", token);
        }

        const metadata: Metadata = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            sessionStartTime: new Date().toISOString(),
            referrer: document.referrer,
        }

        let performanceMetrics: PerformanceMetrics = {
            loadTime: 0,
            domContentLoaded: 0,
            firstPaint: 0,
            firstContentfulPaint: 0,
        };
        if (window.performance) {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigation) {
                performanceMetrics = {
                    loadTime: navigation.loadEventEnd - navigation.startTime,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
                };
            }
        }

        const serializedData = {
            id: gameSession.id,
            userToken: gameSession.userToken,
            startedScenes: Array.from(gameSession.startedScenes) as string[],
            metadata,
            performanceMetrics,
            session: gameSession.session.map((session) => ({
                scene: session.scene,
                timeStarted: session.timeStarted,
                timeEnded: session.timeEnded ? session.timeEnded : null,
            })),
            startScene: gameSession.startScene,
            endScene: gameSession.endScene,
        }

        // console.log("Game session saved successfully");
        return await saveGameSessionAction(serializedData);
    } catch (error) {
        // console.error('Failed to save game session from client:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
        useSaveGameStore.getState().setIsSaving(false);
    }
}