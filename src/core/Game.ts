import Scene from "./Scene";
import Screen from "./Screen";
import Demo from "../logic/scenes/Demo";
import Control from "./utils/Control";
import EventEmitter from "./utils/EventEmitter";
import World from "../logic/scenes/World";

export default class Game {

    static readonly Flag = {
        DEBUG: (1 << 0),
        AUTO_RESIZE: (1 << 1),
        BUFFERING: (1 << 2)
    } as const;

    static flags: number;

    #instance: Game;

    #buss: EventEmitter;

    #control: Control;

    #screen: Screen;

    #loadedScenes: Record<string, Scene> = {};

    #currentScene: Scene | null = null;

    #tickable: Array<Function> = [];

    #TPS = 100;

    #lastUpdateTime = 0;

    #updateInterval = 1000 / this.#TPS;

    constructor(flags: number = 0, layers: number = 1) {
        Game.flags = flags;
        this.#instance = this;
        this.#buss = new EventEmitter();
        this.#control = new Control(new URL("../../resources/keybind.json", window.location.href), new EventEmitter());
        this.#screen = new Screen(3);
        
        this.addScene(new World(this, "demo"));
        this.switchScene("demo");
    }

    addTickable(cb: Function) {
        this.#tickable.push(cb);
    }

    getInstance(): Game {
        return this.#instance;
    }

    getControl() {
        return this.#control;
    }

    getBuss(): EventEmitter {
        return this.#buss;
    }

    getScreen(): Screen {
        return this.#screen;
    }

    /** Добавить сцену в общий пул */
    addScene(scene: Scene) {
        this.#loadedScenes[scene.name] = scene;
    }

    /** Получить сцену из общего пула */
    getScene(name: string) {
        return this.#loadedScenes[name] || null;
    }

    /** Убрать сцену из общего пула */
    removeScene(name: string) {
        delete this.#loadedScenes[name];
    }

    switchScene(name: string) {
        this.#currentScene = this.#loadedScenes[name];
    }

    frame(time: number) {
        if (this.#currentScene) {
            this.#currentScene.render(time)

            if ((time - this.#lastUpdateTime) > this.#updateInterval) {
                this.#currentScene.update(time)
                this.#lastUpdateTime = time;
            }
        }
        requestAnimationFrame(time => this.frame(time));
        this.#screen.updateFps(time);


        this.#tickable.forEach((cb) => cb());
    }

    start() {
        if (Game.flags & Game.Flag.DEBUG) console.log("Game is starting..");
        requestAnimationFrame(time => this.frame(time));
    }
}