import createNewStagedScene from '@/logic/game/CreateSceneFromId';
import loadVideo from '@/utils/loadVideo';
import { createVideoSprite } from '@/utils/createVideoSprite';
import { GameGlobalsStore } from '@/stores/gameGlobals/gameGlobals';
import { initializePixi } from "../../PixiJs/InitializePixi";

const handleAddNewScene = async (sceneId: string, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) => {
    if (!get().app) {
        console.warn("Can't add new scene! App not initialized.");

        // TODO: Fix this bug instead of reloading the page
        location.reload();

        const maxRetries = 5;
        let attempts = 0;

        const retryInterval = setInterval(async () => {
            if (attempts >= maxRetries) {
                clearInterval(retryInterval);
                console.warn("%cMax retries reached. %cUnable to add new scene. Reloading page...", "color: red; font-weight: bold;", "color: white; font-weight: regular;");
                setTimeout(() => {
                    location.reload();
                }, 1000);
                return;
            }

            attempts++;
            console.log(`Attempt ${attempts} to add new scene...`);

            const pixiContainer = document.getElementById("pixi-container");
            if (!pixiContainer) return console.warn("Pixi container not found.");

            await initializePixi({ parentElement: pixiContainer as HTMLDivElement });

            if (get().app) {
                clearInterval(retryInterval);
                console.log("App initialized. Proceeding to add new scene.");
            }
        }, 1000);
    }
    if (get().stagedScenes.some(scene => scene.id === sceneId)) return console.warn(`Can't add new scene! Scene ${sceneId} is already staged.`);
    if (get().loadingScenes.has(sceneId)) return console.warn(`Can't add new scene! Scene ${sceneId} is already loading.`);
    try {
        get().loadingScenes.add(sceneId);

        const newStagedScene = createNewStagedScene(sceneId, false);
        if (!newStagedScene) return console.warn("Couldn't create scene config for scene: ", sceneId);

        const newVideo = await loadVideo(sceneId);
        if (!newVideo?.element) return console.warn("Couldn't load video for scene: ", sceneId);
        if (!newVideo?.hls) return console.warn("Couldn't load hls for scene: ", sceneId);

        if (sceneId === "H0") {
            const musicTime = get().musicPlayer?.currentTime;
            const offset = get().videoOffset;
            if (musicTime && offset) newVideo.element.currentTime = musicTime - offset + 2;
        }

        const newSprite = await createVideoSprite(newVideo.element, get().app);
        if (!newSprite) return console.warn("Couldn't create sprite for scene: ", sceneId);

        newStagedScene.video.sprite = newSprite;
        newStagedScene.video.hls = newVideo.hls;
        newStagedScene.video.player = newVideo.element;

        newStagedScene.video.sprite.visible = false;
        newStagedScene.video.player?.pause();
        newStagedScene.isActive = false;

        newStagedScene.isReady = true;

        set({ ...get(), stagedScenes: [...get().stagedScenes, newStagedScene] });
    } catch (error) {
        console.error("Error loading scene: ", sceneId, error);
    } finally {
        get().loadingScenes.delete(sceneId);
        if (createNewStagedScene) return createNewStagedScene;
        else return null;
    }
};

export default handleAddNewScene;