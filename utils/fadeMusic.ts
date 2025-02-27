export const fadeOutMusic = (player: HTMLAudioElement, from: number, to: number, duration: number) => {
    const startVolume = player.volume;
    const change = startVolume - to;
    const startTime = performance.now();

    const fade = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        let newVolume = Math.max(0, startVolume - change * progress);
        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;

        if (player.volume !== newVolume) {
            player.volume = newVolume;
        } else {
            player.volume = 0;
        }

        if (progress < 1) {
            requestAnimationFrame(fade);
        } else {
            player.volume = 0;
        }
    };

    requestAnimationFrame(fade);
}

export const fadeInMusic = (player: HTMLAudioElement, from: number, to: number, duration: number) => {
    const startVolume = player.volume;
    const change = to - startVolume;
    const startTime = performance.now();

    const fade = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const newVolume = Math.min(1, startVolume + change * progress);
        if (player.volume !== newVolume) {
            player.volume = newVolume;
        } else {
            player.volume = 1;
        }

        // console.log("Fading music from:", player.volume, "to:", to);

        if (progress < 1) {
            requestAnimationFrame(fade);
        } else {
            player.volume = 1;
        }
    };

    requestAnimationFrame(fade);
}
