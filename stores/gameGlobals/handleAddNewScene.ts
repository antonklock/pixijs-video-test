import createNewStagedScene from '@/logic/game/CreateSceneFromId';
import loadVideo from '@/utils/loadVideo';
import { createVideoSprite } from '@/utils/createVideoSprite';
import { GameGlobalsStore } from '@/stores/gameGlobals/gameGlobals';

const handleAddNewScene = async (sceneId: string, get: () => GameGlobalsStore, set: (state: GameGlobalsStore) => void) => {
    if (!get().app) return console.warn("Can't add new scene! App not initialized.");
    if (get().stagedScenes.some(scene => scene.id === sceneId)) return console.warn(`Can't add new scene! Scene ${sceneId} is already staged.`);
    if (get().loadingScenes.has(sceneId)) return console.warn(`Can't add new scene! Scene ${sceneId} is already loading.`);
    try {
        get().loadingScenes.add(sceneId);

        const newStagedScene = createNewStagedScene(sceneId, false);
        if (!newStagedScene) return console.warn("Couldn't create scene config.");

        const newVideo = await loadVideo(sceneId);
        if (!newVideo?.element) return console.warn("Couldn't load video.");
        if (!newVideo?.hls) return console.warn("Couldn't load hls.");

        const newSprite = await createVideoSprite(newVideo.element, get().app);
        if (!newSprite) return console.warn("Couldn't create sprite.");

        newStagedScene.video.sprite = newSprite;
        newStagedScene.video.hls = newVideo.hls;
        newStagedScene.video.player = newVideo.element;

        newStagedScene.video.sprite.visible = false;
        newStagedScene.video.player?.pause();
        newStagedScene.isActive = false;

        newStagedScene.isReady = true;

        set({ ...get(), stagedScenes: [...get().stagedScenes, newStagedScene] });
    } catch (error) {
        console.error("Error loading scene", sceneId, error);
    } finally {
        get().loadingScenes.delete(sceneId);
        if (createNewStagedScene) return createNewStagedScene;
        else return null;
    }
};

export default handleAddNewScene; 