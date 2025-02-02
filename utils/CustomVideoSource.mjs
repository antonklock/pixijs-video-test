import { VideoSource } from "pixi.js";
// import { VideoSource } from "pixi.js/lib/rendering/renderers/shared/texture/sources/VideoSource.js";

export class CustomVideoSource extends VideoSource {
    constructor(options) {
        super(options);
        this._alreadyMediaReady = false;
        this.video = options.resource; // Ensure video is accessible
    }

    _mediaReady() {
        if (this._alreadyMediaReady) return;
        this._alreadyMediaReady = true;

        super._mediaReady();

        this._alreadyMediaReady = false;
    }
}
