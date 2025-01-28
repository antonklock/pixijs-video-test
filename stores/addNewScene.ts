import createNewStagedScene from '@/logic/game/CreateSceneFromId';
import loadVideo from '@/utils/loadVideo';
import { createVideoSprite } from '@/utils/createVideoSprite';
import { GameGlobalsStore } from '@/stores/gameGlobals';

const addNewScene = async (sceneId: string, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) => {
    if (!get().app) return console.warn("Can't add new scene! App not initialized.");
    if (get().stagedScenes.some(scene => scene.id === sceneId)) return console.warn(`Can't add new scene! Scene ${sceneId} is already staged.`);
    if (get().loadingScenes.has(sceneId)) return console.warn(`Can't add new scene! Scene ${sceneId} is already loading.`);
    try {
        get().loadingScenes.add(sceneId);

        const newStagedScene = createNewStagedScene(sceneId, false);
        if (!newStagedScene) return console.warn("Couldn't create scene config.");

        console.log("New staged scene: ", newStagedScene);

        const newVideo = await loadVideo(sceneId);
        if (!newVideo?.element) return console.warn("Couldn't load video.");
        if (!newVideo?.hls) return console.warn("Couldn't load hls.");

        console.log("New video: ", newVideo);

        const newSprite = await createVideoSprite(newVideo.element, get().app);
        if (!newSprite) return console.warn("Couldn't create sprite.");

        console.log("New sprite: ", newSprite);

        newStagedScene.video.sprite = newSprite;
        newStagedScene.video.hls = newVideo.hls;
        newStagedScene.video.player = newVideo.element;

        if (newStagedScene.autoplay) {
            newStagedScene.video.sprite.visible = true;
            newStagedScene.video.player?.play();
            newStagedScene.isActive = true;
            set({ ...get(), currentScene: newStagedScene });
        } else {
            newStagedScene.video.sprite.visible = false;
            newStagedScene.video.player?.pause();
            newStagedScene.isActive = false;
        }

        console.log("New staged scene: ", newStagedScene);

        set({ ...get(), stagedScenes: [...get().stagedScenes, newStagedScene] });
    } catch (error) {
        console.error("Error loading scene", sceneId, error);
    } finally {
        get().loadingScenes.delete(sceneId);
    }
};

export default addNewScene; 