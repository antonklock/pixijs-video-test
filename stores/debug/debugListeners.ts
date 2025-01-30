import gameGlobals from "../gameGlobals/gameGlobals";
import useDebugStore from "./debugStore";
import * as PIXI from "pixi.js";

const toggleHitboxes = () => {
    const showHitboxes = useDebugStore.getState().showHitboxes;

    console.log(`Hitboxes toggled: %c${showHitboxes ? "ON" : "OFF"}`, `color: ${showHitboxes ? "green" : "red"}`);

    const app = gameGlobals.getState().app;
    if (!app) return;

    app.stage.children.forEach((child: PIXI.ContainerChild) => {
        if (child.label && child.label.includes("HB")) {
            child.alpha = !showHitboxes ? 0 : 1;
            child.children.forEach((child) => {
                child.alpha = !showHitboxes ? 0 : 1;
            });
        }
    });

    useDebugStore.getState().setShowHitboxes(!showHitboxes);
};

const toggleLoadingIndicators = () => {
    const showLoadingIndicators = !useDebugStore.getState().showLoadingIndicators;
    useDebugStore.getState().setShowLoadingIndicators(showLoadingIndicators);

    console.log(`Loading indicators toggled: %c${showLoadingIndicators ? "ON" : "OFF"}`, `color: ${showLoadingIndicators ? "green" : "red"}`);
};

let isListenerSetUp = false;

const setupDebugListeners = () => {
    if (isListenerSetUp) return;

    const keydownHandler = (event: KeyboardEvent) => {
        if (event.key === "h" || event.key === "H") {
            toggleHitboxes();
        } else if (event.key === "l" || event.key === "L") {
            toggleLoadingIndicators();
        }
    };

    window.addEventListener("keydown", keydownHandler);
    isListenerSetUp = true;

    return () => {
        window.removeEventListener("keydown", keydownHandler);
        isListenerSetUp = false;
    };
};

export default setupDebugListeners;