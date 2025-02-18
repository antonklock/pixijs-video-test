const calculateStageDimensions = () => {
    console.log("Calculating dimensions");

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetRatio = 16 / 9;

    let width = viewportWidth;
    let height = width / targetRatio;

    if (width > viewportWidth) {
        width = viewportWidth;
        height = width / targetRatio;
    }

    return {
        width: Math.floor(width),
        height: Math.floor(height),
        scale: Math.min(viewportWidth / width, viewportHeight / height),
    };
};

export default calculateStageDimensions;