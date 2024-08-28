import Camera from "./Camera.ts";
import Game from "./Game.ts";

export default class Screen {

    #canvas: HTMLCanvasElement;

    #ctx: CanvasRenderingContext2D;

    #camera: Camera;

    #lastTime: number = performance.now();
    
    #frame: number = 0;

    #fps: number = 0;
    
    #fpsInterval: number = 1000;
    
    #startTime: number = this.#lastTime;

    scale_multiply = 1.5;

    scale: number = 10;

    constructor(width: number = 400, height: number = 400) {
        this.#canvas = this.createCanvas(width, height);
        this.#ctx = this.#canvas.getContext("2d") ?? (() => { throw new Error("Не удалось получить 2d context"); })();
        this.#camera = new Camera(this.getSize().width, this.getSize().height);
        
        if (Game.flags & Game.Flag.AUTO_RESIZE) {
            window.addEventListener("resize", this.resize.bind(this));
            this.resize();
        }
        this.#ctx.imageSmoothingEnabled = false;
    }

    getFps(): number {
        return this.#fps;
    }

    getCamera(): Camera {
        return this.#camera;
    }

    getSize(): { width: number, height: number } {
        return { width: this.#canvas.width, height: this.#canvas.height }
    }

    setSize(width: number, height: number) {
        this.#canvas.width = width;
        this.#canvas.height = height;
    }

    getCtx(): CanvasRenderingContext2D {
        return this.#ctx;
    }

    fillAll(color: string = "white") {
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.width);
    }

    getWidth(): number {
        return this.#canvas.width;
    }

    getHeight(): number {
        return this.#canvas.height;
    }

    resize(): void {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
        this.#camera.setSize(this.#canvas.width, this.#canvas.height);

        const originalWidth = (16 * 32 * 5) / 1.5;
        const originalHeight = (16 * 32 * 3) / 1.5;

        this.scale = Math.min(this.#canvas.width / originalWidth, this.#canvas.height / originalHeight) * this.scale_multiply;
    }

    print(x: number, y: number, text: string, color: string) {
        this.#ctx.fillStyle = color;
        this.#ctx.font = "22px Inter";
        this.#ctx.fillText(text, x, y);
    }

    createCanvas(width: number, height: number): HTMLCanvasElement {
        let element: HTMLCanvasElement = document.createElement("canvas");
        element.width = width;
        element.height = height; 
        (document.getElementById("canvas") ?? (() => { throw new Error("Корневой элемент не найден"); })()).appendChild(element);
        if (Game.flags & Game.Flag.DEBUG) console.log("Canvas creating..");
        return element;
    }

    updateFps(time: number) {
        time - this.#lastTime;
        this.#lastTime = time;

        this.#frame++;
        if (time > this.#startTime + this.#fpsInterval) {
            let elapsedTime = time - this.#startTime;
            this.#fps = Math.round((this.#frame * 1000) / elapsedTime);
            this.#frame = 0;
            this.#startTime = time;
        }
    }
            
}