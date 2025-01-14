"use client";

import MuxPlayer from "@mux/mux-player-react"

interface MuxVideoPlayerProps {
    playbackId: string;
    metadata: {
        video_id: string;
        video_title: string;
        viewer_user_id: string;
        player_init_time: number;
    };
    autoPlay: boolean;
}

export default function MuxVideoPlayer(props: MuxVideoPlayerProps) {
    return (
        <MuxPlayer
            playbackId={props.playbackId}
            metadata={props.metadata}
            autoPlay={props.autoPlay}
        />    
    );
};
