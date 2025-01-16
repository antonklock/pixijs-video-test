"use client";

import { useEffect, useRef, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { usePixiStage } from "@/hooks/usePixiStage";

const dimensions = {
    width: 1280,
    height: 720
}

const preload: "auto" | "none" = "auto";

export default function Home() {
    const [gameStarted, setGameStarted] = useState(false);
    const [domLoaded, setDomLoaded] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const playerRefs = useRef<HTMLVideoElement[]>([]);
    const [videosReady, setVideosReady] = useState(false);
    const videoCount = useRef(0);

    const {
        canvasRef,
        appRef,
        createVideoSprite,
        showNextSprite,
        isInitialized: isPixiInitialized
    } = usePixiStage({
        onError: (error) => console.error(error),
        dimensions,
        gameStarted,
        onInit: () => {
            console.log("PIXI initialization callback received");
            if (playerRefs.current.length === 0) {
                console.log("No video players available yet");
                return;
            }
            initializeVideos();
        }
    });

    const initializeVideos = async () => {
        if (!appRef.current) {
            console.error("Cannot initialize videos - app not ready");
            return;
        }

        console.log("Starting video initialization with app:", {
            hasStage: !!appRef.current?.stage,
            stageChildren: appRef.current?.stage?.children.length,
            videoCount: playerRefs.current.length
        });

        try {
            // Clear any existing sprites
            appRef.current.stage.removeChildren();
                
            // Store current videos
            const currentVideos = [...playerRefs.current];
            
            for (let index = 0; index < currentVideos.length; index++) {
                const player = currentVideos[index];
                if (player) {
                    console.log(`Processing video ${index}...`);
                    if (player.readyState < 3) {
                        await new Promise(resolve => {
                            player.addEventListener('canplay', resolve, { once: true });
                        });
                    }
                    
                    await player.play();
                    
                    if (appRef.current) {
                        console.log(`Creating sprite for video ${index}...`);
                        const sprite = await createVideoSprite(player, appRef.current, index);
                        console.log(`Sprite ${index} created and visible:`, sprite?.visible);
                    }
                }
            }
            setIsInitialized(true);
        } catch (error) {
            console.error("Error initializing videos:", error);
        }
    };

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    useEffect(() => {
        if (gameStarted && canvasRef.current) {
            console.log("Game started and canvas mounted", {
                canvasExists: !!canvasRef.current,
                canvasDimensions: {
                    width: canvasRef.current.width,
                    height: canvasRef.current.height
                }
            });
        }
    }, [gameStarted, canvasRef.current]);

    useEffect(() => {
        if (videosReady && gameStarted && !isInitialized && appRef.current) {
            console.log("Videos ready, starting initialization");
            initializeVideos();
        }
    }, [videosReady, gameStarted, isInitialized, appRef.current]);

  return (
    <div>
{gameStarted ? (<div className="w-full flex flex-col items-center justify-center px-12">
        <h1 className="text-2xl font-bold my-10">Mux Test</h1>
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-auto"
            style={{
                aspectRatio: "16/9",
                maxHeight: "100vh",
                maxWidth: "100vw",
                backgroundColor: '#333',
                display: 'block',
            }}
        />
        <div className="flex flex-col gap-4 items-center mt-4">
            {domLoaded && (
                <div className="flex row gap-4">
                    <MuxPlayer
                        ref={(muxPlayerEl) => {
                            if (muxPlayerEl?.media) {
                                const player = muxPlayerEl.media.nativeEl as HTMLVideoElement;
                                playerRefs.current[0] = player;
                                videoCount.current++;
                                if (videoCount.current === 3) setVideosReady(true);
                            }
                        }}
                        playbackId="iqcu02NmYd02TN1QefAGBG1nyhjwpHyXiOvxDvS02iQU1w"
                        metadata={{
                            video_id: "video-id-G0",
                            video_title: "G0",
                            viewer_user_id: "KlockDev",
                            player_init_time: new Date().getTime()
                        }}
                        autoPlay={true}
                        preload="auto"
                    />
                    <MuxPlayer
                        ref={(muxPlayerEl) => {
                            if (muxPlayerEl?.media) {
                                const player = muxPlayerEl.media.nativeEl as HTMLVideoElement;
                                playerRefs.current[1] = player;
                                videoCount.current++;
                                if (videoCount.current === 3) setVideosReady(true);
                            }
                        }}
                        playbackId="YbnMCyTnPRlnzBlAlvxODSOSJ02pGu00lDqUX8yOWt4M4"
                        metadata={{
                            video_id: "video-id-H0",
                            video_title: "H0",
                            viewer_user_id: "KlockDev",
                            player_init_time: new Date().getTime()
                        }}
                        autoPlay={true}
                        preload="auto"
                    />
                </div>
            )}
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4" 
                onClick={showNextSprite}
            >
                Next Video
            </button>
        </div>
    </div>) : (<div className="w-full flex flex-col items-center justify-center px-12 h-screen">
        <button onClick={() => setGameStarted(true)}>
            Start Game
        </button>
    </div>)}
    </div>
  );
}