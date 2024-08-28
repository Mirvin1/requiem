import Game from "./Game.ts";
import Sprite from "./Sprite";

export default class Scene {

    game: Game;

    name: string;

    nextScene: string | null = null;

    #sprites: Set<Sprite> = new Set();

    constructor(game: Game, name: string) {
        this.game = game;
        this.name = name;
    }

    getSprites(): Set<Sprite> {
        return this.#sprites;
    }

    addSprite(sprite: Sprite): Sprite {
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
        this.game.getScreen().fillAll("black");


        this.getSprites().forEach((sprite) => {
            sprite.render(this.game.getScreen());
        });

        /* debug mode */
        if (Game.flags & Game.Flag.DEBUG) {
            /* display FPS */
            this.game.getScreen().print(15, 30, "FPS: " + this.game.getScreen().getFps().toString(), "red");
            /* display camera Position */
            this.game.getScreen().print(15, 60, "XY: " + this.game.getScreen().getCamera().getPosition().getX() + " / " + this.game.getScreen().getCamera().getPosition().getY(), "red");

            /* camera center */
            this.game.getScreen().getCtx().fillStyle = "red";
            this.game.getScreen().getCtx().fillRect(this.game.getScreen().getWidth() / 2 - 2, this.game.getScreen().getSize().height / 2 - 2, 6, 2);
            this.game.getScreen().getCtx().fillRect(this.game.getScreen().getSize().width / 2 - 6, this.game.getScreen().getSize().height / 2 - 2, 6, 2);

            this.game.getScreen().getCtx().fillRect(this.game.getScreen().getSize().width / 2 - 2, this.game.getScreen().getSize().height / 2 - 2, 2, 6);
            this.game.getScreen().getCtx().fillRect(this.game.getScreen().getSize().width / 2 - 2, this.game.getScreen().getSize().height / 2 - 6, 2, 6);
        }
    }
}