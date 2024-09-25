import Game from "./Game.ts";
import Renderable from "./renderable/Renderable";
import Sprite from "./renderable/Sprite";

export default class Scene {

    game: Game;

    name: string;

    nextScene: string | null = null;

    #sprites: Set<Renderable> = new Set();

    constructor(game: Game, name: string) {
        this.game = game;
        this.name = name;
    }

    getSprites(): Set<Renderable> {
        return this.#sprites;
    }

    addSprite(sprite: Renderable): Renderable {
        this.#sprites.add(sprite);
        return sprite;
    }

    removeSprite(sprite: Sprite): boolean {
        return this.#sprites.delete(sprite);
    }

    /** Обновление состояния сцены */
    update(time: number) {
        this.getSprites().forEach((sprite) => {
            sprite.update(time);
        });
    }

    /** Рендер сцены на экран */
    render(time: number) {
        this.game.getScreen().getLayer(1).clear();
        this.game.getScreen().getLayer(2).clear();

        this.getSprites().forEach((sprite) => {
            sprite.render(this.game.getScreen());
        });

        /* debug mode */
        if (Game.flags & Game.Flag.DEBUG) {
            const layer = this.game.getScreen().getLayer(2);
            /* display FPS */
            layer.print(15, 30, "FPS: " + this.game.getScreen().getFps().toString(), "white");
            /* display camera Position */
            layer.print(15, 60, "XY: " + this.game.getScreen().getCamera().getPosition().getX() + "/" + this.game.getScreen().getCamera().getPosition().getY(), "white");
            /* camera center */
            layer.getContext().fillStyle = "rgba(255, 255, 255, 0.9)";

            layer.getContext().fillRect(this.game.getScreen().getWidth() / 2 - 2, this.game.getScreen().getHeight() / 2 - 2, 6, 2);
            layer.getContext().fillRect(this.game.getScreen().getWidth() / 2 - 6, this.game.getScreen().getHeight() / 2 - 2, 6, 2);

            layer.getContext().fillRect(this.game.getScreen().getWidth() / 2 - 2, this.game.getScreen().getHeight() / 2 - 2, 2, 6);
            layer.getContext().fillRect(this.game.getScreen().getWidth() / 2 - 2, this.game.getScreen().getHeight() / 2 - 6, 2, 6);


            // layer.getContext().restore();
        }
        this.game.getScreen().getCamera().renderRequest = false;
    }
}