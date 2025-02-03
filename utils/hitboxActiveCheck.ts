import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

export default function hitboxIsActive(hitboxName: string) {
    const hitboxes = useGameGlobalsStore.getState().currentScene?.hitboxes;
    const hitbox = hitboxes?.find(hitbox => hitbox.name === hitboxName);
    if (!hitbox) {
        console.warn(`Hitbox not found!`)
        console.log("hitboxes: ", hitboxes)
        return false;
    }
    if (hitbox.isActive) {
        return true;
    }
    return false;
}