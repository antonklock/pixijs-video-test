import { VideoSource } from "pixi.js";

export class CustomVideoSource extends VideoSource {
    constructor(options) {
        super(options);
        this._alreadyMediaReady = false;
        this.video = options.resource; // Ensure this is set correctly
    }

    _mediaReady() {
        if (this._alreadyMediaReady) return; // Prevent recursion
        
        this._alreadyMediaReady = true; // Set before calling super

        console.log("CustomVideoSource: Calling _mediaReady()");

        try {
            super._mediaReady(); // Call the parent class method
        } catch (error) {
            console.error("Error in _mediaReady:", error);
        }
    }

    update() {
        // Ensure update is only called if media is ready
        if (!this._alreadyMediaReady) return;
        super.update();
    }
}
