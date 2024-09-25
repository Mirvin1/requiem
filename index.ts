import Game from "./src/core/Game.ts";
import Sprite from "./src/core/renderable/Sprite";
import Vector2 from "./src/core/utils/Vector2";

window.onload = () => {
    const game = new Game(Game.Flag.DEBUG | Game.Flag.AUTO_RESIZE);
    game.start();

    let keysPressed: Record<string, boolean> = {};

    document.addEventListener('keydown', function (event) {
        const key = event.code;
        keysPressed[key] = true;
    });

    document.addEventListener('keyup', function (event) {
        const key = event.code;
        keysPressed[key] = false;
    });

    game.addTickable(updatePosition);

    function updatePosition(): void {
        const step = 3;
        const step2 = 3;

        let cameraX: number = game.getScreen().getCamera().getPosition().getX();

        let cameraY: number = game.getScreen().getCamera().getPosition().getY();

        if (keysPressed['KeyW'] && keysPressed['KeyD']) {
            cameraY += step2;
            cameraX += step2;
        } else if (keysPressed['KeyW'] && keysPressed['KeyA']) {
            cameraY += step2;
            cameraX -= step2;
        } else if (keysPressed['KeyS'] && keysPressed['KeyD']) {
            cameraY -= step2;
            cameraX += step2;
        } else if (keysPressed['KeyS'] && keysPressed['KeyA']) {
            cameraY -= step2;
            cameraX -= step2;
        } else if (keysPressed['KeyW']) {
            cameraY += step;
        } else if (keysPressed['KeyS']) {
            cameraY -= step;
        } else if (keysPressed['KeyA']) {
            cameraX -= step;
        } else if (keysPressed['KeyD']) {
            cameraX += step;
        }
        game.getScreen().getCamera().setPosition(new Vector2(cameraX, cameraY));
    }
};