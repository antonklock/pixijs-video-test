import * as PIXI from "pixi.js";
import { useRef, useState, useEffect } from "react";
import { Dimensions } from "../types";

interface UsePixiStageProps {
    onError: (error: string) => void;
    dimensions: { width: number; height: number };
}

export const usePixiStage = ({ onError, dimensions: Dimensions }: UsePixiStageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const appRef = useRef<PIXI.Application>();
    const videoSpritesRef = useRef<PIXI.Sprite[] | null[]>([]);

    const calculateDimensions = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const targetRatio = 16 / 9;

        let width = viewportWidth;
        let height = width / targetRatio;

        if (height > viewportHeight) {
            height = viewportHeight;
            width = height * targetRatio;
        }

        return {
            width: Math.floor(width),
            height: Math.floor(height),
            scale: Math.min(viewportWidth / width, viewportHeight / height),
        };
    };

    const [dimensions, setDimensions] = useState<Dimensions>(calculateDimensions);

    const createVideoSprite = async (
        video: HTMLVideoElement,
        app: PIXI.Application | undefined,
    ) => {
        try {
            await new Promise<void>((resolve, reject) => {
                if (video.readyState >= 2) {
                    resolve();
                } else {
                    video.addEventListener("loadeddata", () => resolve(), { once: true });
                    video.addEventListener("error", (event) => reject(event.error as Error), { once: true });
                }
            });

            const source = new PIXI.VideoSource({
                resource: video,
                autoPlay: false,
                updateFPS: 30
            });

            const texture = new PIXI.Texture({ source });
            const sprite = new PIXI.Sprite(texture);

            sprite.anchor.set(0.5);
            sprite.width = dimensions.width;
            sprite.height = dimensions.height;
            sprite.position.set(dimensions.width / 2, dimensions.height / 2);

            console.log("Sprite created: ", sprite);
            sprite.visible = true;

            if (app?.stage) {
                app.stage.addChild(sprite);
            } else {
                console.error("Can't add sprite to stage! App stage not found.");
            }

            return sprite;
        } catch (error) {
            console.error(`Error creating sprite:`, error);
            throw error;
        }
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const app = new PIXI.Application();
        app.init({
            canvas: canvasRef.current,
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: 0x330000,
            antialias: true,
        });

        appRef.current = app;

        return () => {
            if (appRef.current) {
                appRef.current.stage?.removeChildren();
                appRef.current.renderer?.destroy();
                appRef.current = undefined;
            }
        };
    }, [canvasRef.current, dimensions]);

    return {
        containerRef,
        canvasRef,
        appRef,
        videoSpritesRef,
        dimensions,
        setDimensions,
        calculateDimensions,
        createVideoSprite,
    };
};