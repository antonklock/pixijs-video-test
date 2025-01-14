"use client";

import { useEffect, useRef, useState } from "react";
import { initializePixi } from "../../PixiJs/InitializePixi";
import MuxPlayer from "@mux/mux-player-react";
import * as PIXI from "pixi.js";
import { usePixiStage } from "@/hooks/usePixiStage";

const dimensions = {
    width: 1280,
    height: 720
}

const preload: "auto" | "none" = "auto";

export default function Home() {
    const [playerInitTime] = useState(() => Date.now());
    const [domLoaded, setDomLoaded] = useState(false);
    const [videoIndex, setVideoIndex] = useState(0);
    const playerRefs = useRef<HTMLVideoElement[]>([]);
    
    const { canvasRef, appRef, createVideoSprite } = usePixiStage({
        onError: (error) => {
            console.error("Pixi.js error:", error);
        },
        dimensions
    });

    useEffect(() => {
        if (!appRef.current) return;

        console.log("App ref: ", appRef.current);

        // Cleanup function
        return () => {
            appRef.current?.stage.removeChildren();
        };
    }, [appRef.current]);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const playVideo = async () => {
        setVideoIndex((prev) => prev + 1);

        if(!playerRefs.current[videoIndex]) setVideoIndex(0);
        
        // First pause all videos and remove existing sprites
        await Promise.all(
            playerRefs.current.map(player => 
                player?.paused ? Promise.resolve() : player?.pause()
            )
        );
        appRef.current?.stage.removeChildren();

        // Then play the selected video and create sprite
        try {
            const videoElement = playerRefs.current[videoIndex];
            await videoElement?.play();
            
            if(!videoElement) {
                console.error("Can't add sprite to stage! Video element not found!");
                return;
            }

            if(!appRef.current) {
                console.error("Can't add sprite to stage! App stage not found!");
                return;
            }

            const sprite = await createVideoSprite(videoElement, appRef.current);
            // Center the sprite
            sprite.x = dimensions.width / 2;
            sprite.y = dimensions.height / 2;
            sprite.anchor.set(0.5);

            appRef.current?.stage.addChild(sprite);
            sprite.visible = true;
            
        } catch (error) {
            console.error('Error playing video:', error);
        }
    }

  return (
    <div className="w-full flex flex-col items-center justify-center px-12">
        <h1 className="text-2xl font-bold my-10">Mux Test</h1>
        <div className="flex flex-col gap-4 items-center">
            {domLoaded && (
                <div className="flex row gap-4">
                    <MuxPlayer
                        ref={(muxPlayerEl) => {
                            if (muxPlayerEl?.media) {
                                const player = muxPlayerEl.media.nativeEl as HTMLVideoElement;
                                playerRefs.current.push(player);
                            }
                        }}
                        playbackId="iqcu02NmYd02TN1QefAGBG1nyhjwpHyXiOvxDvS02iQU1w"
                        metadata={{
                            video_id: "video-id-G0",
                            video_title: "G0",
                            viewer_user_id: "KlockDev",
                            player_init_time: playerInitTime
                        }}
                        autoPlay={false}
                        preload={preload}
                    />
                    <MuxPlayer
                        ref={(muxPlayerEl) => {
                            if (muxPlayerEl?.media) {
                                const player = muxPlayerEl.media.nativeEl as HTMLVideoElement;
                                playerRefs.current.push(player);
                            }
                        }}
                        playbackId="YbnMCyTnPRlnzBlAlvxODSOSJ02pGu00lDqUX8yOWt4M4"
                        metadata={{
                            video_id: "video-id-H0",
                            video_title: "H0",
                            viewer_user_id: "KlockDev",
                            player_init_time: playerInitTime
                        }}
                        autoPlay={false}
                        preload={preload}
                    />
                    <MuxPlayer
                        ref={(muxPlayerEl) => {
                            if (muxPlayerEl?.media) {
                                const player = muxPlayerEl.media.nativeEl as HTMLVideoElement;
                                playerRefs.current.push(player);
                            }
                        }}
                        playbackId="EiKu6MjIF9KryZ02ImcqSteBq4JCo5Z4jxSVQAVj1GGA"
                        metadata={{
                            video_id: "video-id-H1",
                            video_title: "H1",
                            viewer_user_id: "KlockDev",
                            player_init_time: playerInitTime
                        }}
                        autoPlay={false}
                        preload={preload}
                    />
                </div>
            )}
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => playVideo()}>Next video</button>  
        </div>
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
            }}
        />
    </div>
  );
}