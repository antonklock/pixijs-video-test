"use client";

import { useEffect } from "react";
import { Sprite, Assets } from "pixi.js";
import useGameGlobalsStore from "@/stores/gameGlobals/gameGlobals";

interface DisplaySkipIntroProps {
  startDelay?: number;
}

function DisplaySkipIntro({ startDelay = 4500 }: DisplaySkipIntroProps) {
  const { app } = useGameGlobalsStore();

  useEffect(() => {
    const display = window.localStorage.getItem("shouldDisplaySkip") === "true";

    if (display) {
      async function createSpriteAnimation() {
        const textures = await Promise.all([
          Assets.load("/buttons/skip-intro/skip-intro-01.png"),
          Assets.load("/buttons/skip-intro/skip-intro-02.png"),
          Assets.load("/buttons/skip-intro/skip-intro-03.png"),
          Assets.load("/buttons/skip-intro/skip-intro-04.png"),
        ]);

        const hitboxX = app.stage.width * 0.8;
        const hitboxY = app.stage.height * 0.75;

        const sprite = Sprite.from(textures[0]);
        app.stage.addChild(sprite);
        sprite.pivot.set(sprite.width / 2, sprite.height / 2);
        sprite.position.set(hitboxX, hitboxY);
        sprite.scale.set(0.18);

        sprite.label = "skip-intro";

        let currentFrame = 0;
        const frameInterval = 100;

        function animate() {
          if (currentFrame < textures.length - 1) {
            currentFrame++;
            sprite.texture = textures[currentFrame];
            setTimeout(animate, frameInterval);
          }
        }

        animate();
      }

      if (app) {
        setTimeout(() => {
          createSpriteAnimation();
        }, startDelay);
      }
    } else {
      console.log("Skip intro should not be displayed");
    }
  }, [app]);

  return null;
}

export default DisplaySkipIntro;
