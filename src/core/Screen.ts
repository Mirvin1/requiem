import Camera from "./Camera.ts";
import Game from "./Game.ts";
import Layer from "./Layer";

export default class Screen {

    #width: number;

    #height: number;

    #layers: Layer[] = [];

    #camera: Camera;

    #lastTime: number = performance.now();

    #frame: number = 0;

    #fps: number = 0;

    #fpsInterval: number = 1000;

    #startTime: number = this.#lastTime;

    scale_multiply = 1.5;

    scale: number = 10;

    constructor(layers: number, width: number = 700, height: number = 700) {
        this.#width = width;
        this.#height = height;
        this.#camera = new Camera(this.#width, this.#height);

        for (let i = 0; i < layers; i++) {
            this.#layers.push(new Layer(i));
        }
        if (Game.flags & Game.Flag.AUTO_RESIZE) {
            window.addEventListener("resize", this.resize.bind(this));
        }
        this.resize();
        console.log(this.#layers);

    }

    getFps(): number {
        return this.#fps;
    }

    getCamera(): Camera {
        return this.#camera;
    }

    setSize(width: number, height: number) {
        this.#width = width;
        this.#height = height;
    }

    getLayer(index: number = 0): Layer {
        if (index > this.#layers.length || index < 0) throw new Error("Некорректный индекс");
        return this.#layers[index];
    }

    getWidth(): number {
        return this.#width;
    }

    getHeight(): number {
        return this.#height;
    }

    resize(): void { // воркать
        this.#layers.forEach((layer) => {
            const canvas = layer.getCanvas();
            // canvas.width = window.innerWidth;
            // canvas.height = window.innerHeight;
            const ratio = window.devicePixelRatio;

            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";

            layer.getContext().scale(ratio, ratio);

            // canvas.width = window.innerWidth * dpi;
            // canvas.height = window.innerHeight * dpi;
            // canvas.style.width = window.innerWidth + 'px';
            // canvas.style.height = window.innerHeight + 'px';
            
            
            // const dpi = window.devicePixelRatio;
            const baseWidth = 1080; // Базовый размер canvas
            const baseHeight = 1920;
            
            // const scaleX = Math.round(canvas.width / 1080); // 1000 - это базовый размер canvas
            // const scaleY = Math.round(canvas.height / 1920);
            // const scaleX = Math.round((canvas.width * ratio) / baseWidth);
            // const scaleY = Math.round((canvas.height * ratio) / baseHeight);
        
            // layer.getContext().scale(scaleX, scaleY);
            // layer.getContext().save();
            // layer.getContext().scale(scaleX, scaleY);
        });
        this.#camera.setSize(window.innerWidth, window.innerHeight);
        this.setSize(window.innerWidth, window.innerHeight);

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