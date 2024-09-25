
export default class Layer {

    #ctx: CanvasRenderingContext2D;

    #canvas: HTMLCanvasElement;

    constructor(index: number, alphaChannel: boolean = true) {
        const element: HTMLCanvasElement = document.createElement("canvas");
        element.style.zIndex = index.toString();
        this.#canvas = element;
        this.#ctx = element.getContext("2d", { alpha: alphaChannel }) ?? (() => { throw new Error("Не удалось получить 2DContext"); })();
        this.#ctx.imageSmoothingEnabled = false;

        (document.getElementById("canvas") ?? (() => { throw new Error("Корневой элемент не найден"); })()).appendChild(element);
    }

    getContext(): CanvasRenderingContext2D {
        return this.#ctx;
    }

    getCanvas(): HTMLCanvasElement {
        return this.#canvas;
    }

    print(x: number, y: number, text: string, color: string) {
        this.#ctx.fillStyle = color;
        this.#ctx.font = "22px FFFForward";
        this.#ctx.fillText(text, x, y);
    }

    fillAll(color: string = "white") {
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
}

