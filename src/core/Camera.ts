import Sprite from "./Sprite";
import Vector2 from "./utils/Vector2"

export default class Camera {

    #pos: Vector2;
    
    #width: number;
    
    #height: number;
    
    #boxWidth: number;

    #boxHeight: number;

    #target: Sprite | null = null;

    constructor(width: number, height: number, pos: Vector2 = new Vector2(0, 0)) {
        this.#pos = pos;
        this.#width = width;
        this.#height = height;
        this.#boxWidth = width - 20;
        this.#boxHeight = height - 20;
    }

    isTarger(): boolean {
        return this.#target != null;
    }

    setTarget(target: Sprite | null) {
        this.#target = target;
    }

    setSize(width: number, height: number): void {
        this.#width = width;
        this.#height = height;
    }

    getWidth(): number {
        return this.#width;
    }

    getHeight(): number {
        return this.#height;
    }

    setBoxSize(width: number, height: number): void {
        this.#boxWidth = width;
        this.#boxHeight = height;
    }

    getBoxSize(): { width: number, height: number } {
        return { width: this.#boxWidth, height: this.#boxHeight }
    }

    atCanvas(pos: Vector2, camera: Camera): Vector2 {
        const relativeX = pos.getX() - camera.getPosition().getX();
        const relativeY = pos.getY() - camera.getPosition().getY();
        return new Vector2(
            relativeX + camera.getWidth() / 2,
            -relativeY + camera.getHeight() / 2
        );
    }

    atSpace(pos: Vector2, camera: Camera): Vector2 {
        const relativeX = pos.getX() - this.getWidth() / 2;
        const relativeY = -(pos.getY() - this.getHeight() / 2);
        return new Vector2(
            relativeX + camera.getPosition().getX(),
            relativeY + camera.getPosition().getY()
        );
    }

    setPosition(pos: Vector2): void {
        this.#pos = pos;
    }

    getPosition(): Vector2 {
        return this.#pos;
    }
}