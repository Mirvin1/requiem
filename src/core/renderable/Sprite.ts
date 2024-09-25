import Renderable from "./Renderable";
import Screen from "../Screen.ts";
import Vector2 from "../utils/Vector2.ts";

export default class Sprite implements Renderable {

    static readonly Flags = {
        COLISION: (1 << 0)
    } as const;

    #pos: Vector2;

    #width: number = 0;

    #height: number = 0;

    #color: string;

    #frame: number = 0;

    #flags: number = 0;

    scale = 9;

    renderRequest: boolean = false;

    constructor(width: number, height: number, color: string = "purple", pos: Vector2 = new Vector2(0, 0)) {
        this.#width = width;
        this.#height = height;
        this.#color = color;
        this.#pos = pos;
    }

    setFlags(flags: number, value: boolean): void {
        this.#flags = value ? this.#flags | flags : this.#flags & ~flags;
    }

    isFlag(flag: number): boolean {
        return (this.#flags & flag) != 0;
    }

    getWidth(): number {
        return this.#width;
    }

    getHeight(): number {
        return this.#height;
    }

    setPosition(pos: Vector2): void {
        this.#pos = pos;
        this.renderRequest = true;

    }

    getPosition(): Vector2 {
        return this.#pos;
    }

    getFrame(): number {
        return this.#frame;
    }

    setFrame(frame: number) {
        this.#frame = frame;
    }

    getColor(): string {
        return this.#color;
    }

    update(time: number): void {

    }

    isCollision(sprites: Set<Sprite>): boolean {
        return Array.from(sprites).some(sprite => (
            this.getPosition().getX() < sprite.getPosition().getX() + sprite.getWidth() &&
            this.getPosition().getX() + this.getWidth() > sprite.getPosition().getX() &&
            this.getPosition().getY() < sprite.getPosition().getY() + sprite.getHeight() &&
            this.getPosition().getY() + this.getHeight() > sprite.getPosition().getY()
        ));
    }

    render(screen: Screen, relative: boolean = true): void {
        // if (this.renderRequest || screen.getCamera().renderRequest) {
        const ctx = screen.getLayer(0).getContext();
        const camera = screen.getCamera();

        const scaledX = Math.round((this.getPosition().getX() - camera.getPosition().getX()) * screen.scale + camera.getWidth() / 2);
        const scaledY = Math.round((camera.getHeight() / 2) - (this.getPosition().getY() - camera.getPosition().getY()) * screen.scale);
        const scaledWidth = Math.round(this.getWidth() * screen.scale);
        const scaledHeight = Math.round(this.getHeight() * screen.scale);

        // const img = new Image(32, 32);
        // img.src = "../../resources/images/tile/grass.png";
        // ctx.drawImage(img, scaledX, scaledY, scaledWidth, scaledHeight);
        const finalPos = camera.atCanvas(this.#pos);
        ctx.fillStyle = "green";
        ctx.fillRect(finalPos.getX(), finalPos.getY(), this.#width, this.#height);
        // ctx.restore();
        // console.log("render");
        // console.log(finalPos);

        // }

        /* position at canvas */
        // if (relative) finalPosition = Position.atCanvas(finalPosition, screen.getCamera());

        /* render */
        // const img = new Image(32, 32);
        // img.src = "../../resources/images/tile/grass.png";
        // ctx.drawImage(img, finalPosition.getX(), finalPosition.getY(), this.#width, this.#height);
        // this.drawSprite(screen.getCtx(), this, screen.screen.scale, screen.getCamera());
        // this.drawSprite(screen, this, screen.scale, finalPosition.getX(), finalPosition.getY());
        // ctx.fillStyle = this.#color;
        // ctx.fillRect(finalPosition.getX(), finalPosition.getY(), this.#width, this.#height);
    }
}