import * as PIXI from "pixi.js";
import { useRef, useState, useEffect } from "react";
import { Dimensions } from "../types";

interface UsePixiStageProps {
    onError: (error: string) => void;
    dimensions: { width: number; height: number };
    onInit?: () => void;
    gameStarted?: boolean;
}

export const usePixiStage = ({ onError, dimensions, onInit, gameStarted }: UsePixiStageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const appRef = useRef<PIXI.Application>();
    const videoSpritesRef = useRef<PIXI.Sprite[] | null[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

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

    // const [dimensions, setDimensions] = useState<Dimensions>(calculateDimensions);

    const [currentSpriteIndex, setCurrentSpriteIndex] = useState<number>(-1);

    const createVideoSprite = async (
        video: HTMLVideoElement,
        app: PIXI.Application | undefined,
        index: number
    ) => {
        try {
            console.log(`Creating sprite ${index}, video readyState:`, video.readyState);
            await new Promise<void>((resolve, reject) => {
                if (video.readyState >= 2) {
                    console.log(`Video ${index} already loaded`);
                    resolve();
                } else {
                    console.log(`Waiting for video ${index} to load...`);
                    video.addEventListener("loadeddata", () => {
                        console.log(`Video ${index} loaded`);
                        resolve();
                    }, { once: true });
                    video.addEventListener("error", (event) => reject(event.error as Error), { once: true });
                }
            });

            console.log(`Creating texture for video ${index}`);
            const source = new PIXI.VideoSource({
                resource: video,
                autoPlay: true,
                updateFPS: 30
            });

            const texture = new PIXI.Texture({ source });
            const sprite = new PIXI.Sprite(texture);

            console.log(`Setting sprite ${index} properties`);
            sprite.anchor.set(0, 0);
            sprite.width = dimensions.width;
            sprite.height = dimensions.height;
            sprite.position.set(0, 0);
            sprite.visible = index === 0;
            sprite.alpha = 1;

            if (app?.stage) {
                console.log(`Adding sprite ${index} to stage`);
                app.stage.addChild(sprite);
                videoSpritesRef.current[index] = sprite;
                
                if (index === 0) {
                    video.currentTime = 0;
                    await video.play();
                } else {
                    video.pause();
                }
                
                app.renderer.render(app.stage);
                
                console.log(`Sprite ${index} created and added to stage. Stage children:`, app.stage.children.length);
                console.log(`Sprite ${index} visibility:`, sprite.visible);
                console.log(`Sprite ${index} dimensions:`, { width: sprite.width, height: sprite.height });
                console.log(`Sprite ${index} position:`, { x: sprite.x, y: sprite.y });
                
                return sprite;
            } else {
                throw new Error("App stage not found");
            }
        } catch (error) {
            console.error(`Error creating sprite ${index}:`, error);
            throw error;
        }
    };

    const showNextSprite = () => {
        const nextIndex = (currentSpriteIndex + 1) % videoSpritesRef.current.length;
        
        // Hide all sprites
        videoSpritesRef.current.forEach(sprite => {
            if (sprite) sprite.visible = false;
        });

        // Show next sprite
        const nextSprite = videoSpritesRef.current[nextIndex];
        if (nextSprite) {
            nextSprite.visible = true;
            const nextVideo = (nextSprite.texture.source as PIXI.VideoSource).resource;
            
            const ensureVideoReady = () => {
                if (nextVideo.readyState >= 4 &&
                    nextVideo.currentTime > 0.1 &&
                    !nextVideo.paused &&
                    !nextVideo.seeking) {
                    
                    // Pause other videos
                    videoSpritesRef.current.forEach((sprite, i) => {
                        if (i !== nextIndex && sprite) {
                            (sprite.texture.source as PIXI.VideoSource).resource.pause();
                        }
                    });
                    
                    setCurrentSpriteIndex(nextIndex);
                } else {
                    requestAnimationFrame(ensureVideoReady);
                }
            };

            nextVideo.currentTime = 0;
            nextVideo.play().then(() => {
                ensureVideoReady();
            }).catch(error => {
                console.error("Error playing video:", error);
            });
        }
    };

    useEffect(() => {
        if (!canvasRef.current || !gameStarted || isInitialized) {
            console.log("PIXI init conditions:", { 
                hasCanvas: !!canvasRef.current, 
                gameStarted,
                isInitialized 
            });
            return;
        }

        console.log("Starting PIXI application initialization");
        const app = new PIXI.Application();
        
        // Force the canvas to be visible
        canvasRef.current.style.display = 'block';
        
        const initApp = async () => {
            try {
                console.log("Running PIXI init");
                await app.init({
                    canvas: canvasRef.current!,
                    width: dimensions.width,
                    height: dimensions.height,
                    backgroundColor: 0x333333,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1,
                });

                // Set the app reference immediately after initialization
                appRef.current = app;

                // Ensure the stage is visible
                app.stage.sortableChildren = true;
                app.stage.eventMode = 'static';
                
                console.log("PIXI application initialized successfully:", {
                    hasApp: !!appRef.current,
                    hasStage: !!app.stage,
                    dimensions: {
                        width: app.screen.width,
                        height: app.screen.height,
                        canvasWidth: canvasRef.current?.width,
                        canvasHeight: canvasRef.current?.height
                    }
                });

                // Start the render loop
                app.ticker.start();
                
                setIsInitialized(true);
                console.log("Calling onInit callback");
                onInit?.(); // Call the callback when initialization is complete
            } catch (error) {
                console.error("Error initializing PIXI application:", error);
                onError("Failed to initialize PIXI application");
            }
        };

        // Initialize immediately
        initApp();

        return () => {
            console.log("Cleaning up PIXI application");
            if (appRef.current) {
                appRef.current.ticker.stop();
                appRef.current.stage?.removeChildren();
                appRef.current.renderer?.destroy();
                appRef.current = undefined;
                setIsInitialized(false);
            }
        };
    }, [gameStarted]);

    return {
        containerRef,
        canvasRef,
        appRef,
        videoSpritesRef,
        dimensions,
        isInitialized,
        // setDimensions,
        calculateDimensions,
        createVideoSprite,
        showNextSprite,
        currentSpriteIndex,
    };
};