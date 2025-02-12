#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 /path/to/input_directory [ /path/to/output_directory ]"
    exit 1
}

# Check if at least one argument (input directory) is provided
if [ $# -lt 1 ]; then
    usage
fi

# Assign input directory and check if it exists
INPUT_DIR="$1"
if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: Input directory '$INPUT_DIR' does not exist."
    exit 1
fi

# Check for required commands
for cmd in ffmpeg ffprobe; do
    if ! command -v $cmd &> /dev/null; then
        echo "Error: $cmd is not installed or not in PATH."
        exit 1
    fi
done

# Assign output directory: second argument or default to current directory
if [ $# -ge 2 ]; then
    OUTPUT_BASE_DIR="$2"
    # Create the output base directory if it doesn't exist
    mkdir -p "$OUTPUT_BASE_DIR"
else
    OUTPUT_BASE_DIR="$PWD"
fi

# Function to process a single video file
process_video() {
    local INPUT_FILE="$1"
    local OUTPUT_BASE_DIR="$2"

    # Get the base filename without extension
    local FILENAME=$(basename "$INPUT_FILE")
    local BASENAME="${FILENAME%.*}"

    # Create specific output directory within the base output directory using the base filename
    local OUTPUT_DIR="$OUTPUT_BASE_DIR/$BASENAME"

    # Remove existing output directory if it exists
    if [ -d "$OUTPUT_DIR" ]; then
        echo "Output directory '$OUTPUT_DIR' already exists. Removing it to avoid unused .ts files."
        rm -rf "$OUTPUT_DIR"
    fi
    mkdir -p "$OUTPUT_DIR"

    # Get the frame rate of the input video
    local FRAME_RATE=$(ffprobe -v 0 -of default=noprint_wrappers=1:nokey=1 \
        -select_streams v:0 -show_entries stream=avg_frame_rate "$INPUT_FILE")

    # Convert frame rate to a number
    IFS='/' read -r num denom <<< "$FRAME_RATE"
    if [ -z "$denom" ] || [ "$denom" -eq 0 ]; then
        denom=1
    fi
    FRAME_RATE=$(echo "scale=2; $num/$denom" | bc)
    FRAME_RATE=${FRAME_RATE%.*}

    # Calculate GOP size (number of frames per 4 seconds)
    local GOP_SIZE=$((FRAME_RATE * 4))

    # Define resolutions, bitrates, and output names
    local RESOLUTIONS=("1280x720" "1920x1080")
    local BITRATES=("1200k" "2500k" "8000k")
    local OUTPUTS=("720p" "1080p")
    local PLAYLISTS=()

    # Loop over the variants
    for i in "${!RESOLUTIONS[@]}"; do
        local RES="${RESOLUTIONS[$i]}"
        local BITRATE="${BITRATES[$i]}"
        local OUTPUT_NAME="${OUTPUTS[$i]}"
        local PLAYLIST="${OUTPUT_NAME}.m3u8"
        PLAYLISTS+=("$PLAYLIST")

        # Set profile and level based on resolution
        if [ "$OUTPUT_NAME" == "1080p" ]; then
            local PROFILE="high"
            local LEVEL="4.2"
        else
            local PROFILE="main"
            local LEVEL="3.1"
        fi

        echo "Processing $FILENAME - $OUTPUT_NAME..."

        if ! ffmpeg -y -i "$INPUT_FILE" \
        -c:v libx264 -preset veryfast -profile:v "$PROFILE" -level:v "$LEVEL" -b:v "$BITRATE" -s "$RES" \
        -c:a aac -b:a 128k -ac 2 \
        -g $GOP_SIZE -keyint_min $GOP_SIZE -sc_threshold 0 \
        -force_key_frames "expr:gte(t,n_forced*4)" \
        -hls_time 4 -hls_list_size 0 -hls_flags independent_segments \
        -hls_segment_filename "$OUTPUT_DIR/${OUTPUT_NAME}_%03d.ts" \
        "$OUTPUT_DIR/$PLAYLIST"; then
            echo "Error: Failed to process $FILENAME - $OUTPUT_NAME."
            return 1
        fi
    done

    # Generate master playlist
    local MASTER_PLAYLIST="$OUTPUT_DIR/playlist.m3u8"

    echo "Generating master playlist for $FILENAME..."
    {
        echo "#EXTM3U"
        echo "#EXT-X-VERSION:3"

        for i in "${!RESOLUTIONS[@]}"; do
            local RESOLUTION="${RESOLUTIONS[$i]}"
            local OUTPUT_NAME="${OUTPUTS[$i]}"
            local PLAYLIST="${OUTPUTS[$i]}.m3u8"
            local BITRATE="${BITRATES[$i]}"
            local BANDWIDTH=$(( ${BITRATE%k} * 1000 + 128000 )) # Video bitrate + audio bitrate in bits per second

            echo ""
            echo "#EXT-X-STREAM-INF:BANDWIDTH=$BANDWIDTH,RESOLUTION=$RESOLUTION"
            echo "$PLAYLIST"
        done
    } > "$MASTER_PLAYLIST"

    echo "Processing completed successfully for $FILENAME"
    echo "Output directory: $OUTPUT_DIR"
}

# Find and process all video files in the input directory
find "$INPUT_DIR" -type f \( -name "*.mp4" -o -name "*.mkv" -o -name "*.avi" -o -name "*.mov" \) | while read -r video_file; do
    echo "Processing file: $video_file"
    if ! process_video "$video_file" "$OUTPUT_BASE_DIR"; then
        echo "Error processing $video_file"
        continue
    fi
done

echo "All video processing completed."