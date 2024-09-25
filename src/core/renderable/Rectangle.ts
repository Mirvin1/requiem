import Chunk from "../../logic/world/Chunk";
import Screen from "../Screen";
import Vector2 from "../utils/Vector2";
import Renderable from "./Renderable";

export default class Rectangle implements Renderable {

    #pos: Vector2;

    #vel: Vector2 = new Vector2(0, 0);

    #width: number = 0;

    #height: number = 0;

    #color: string;

    deltaTime: number = 0;

    constructor(pos: Vector2, width: number, height: number, color: string) {
        this.#pos = pos;
        this.#width = width;
        this.#height = height;
        this.#color = color;
    }

    setVelocity(vel: Vector2) {
        this.#vel = vel;
    }

    getVelocity(): Vector2 {
        return this.#vel;
    }

    getPosition(): Vector2 {
        return this.#pos;
    }

    setPosition(pos: Vector2): void {
        this.#pos = pos;
    }

    getWidth(): number {
        return this.#width;
    }

    getHeight(): number {
        return this.#height;
    }

    isCollision(chunks: Chunk[]) {
        const TILE_SIZE = Chunk.TILE_SIZE;
        const CHUNK_SIZE = Chunk.CHUNK_SIZE;

        const pos = this.getPosition();
        const startTileX = Math.floor(pos.getX() / TILE_SIZE);
        const startTileY = Math.floor(pos.getY() / TILE_SIZE);
        const endTileX = Math.floor((pos.getY() + this.getWidth()) / TILE_SIZE);
        const endTileY = Math.floor((pos.getY() + this.getWidth()) / TILE_SIZE);

        for (const chunk of chunks) {
            const chunkStartX = chunk.#x / (TILE_SIZE * CHUNK_SIZE);
            const chunkStartY = chunk.y / (TILE_SIZE * CHUNK_SIZE);
            const chunkEndX = chunkStartX + CHUNK_SIZE - 1;
            const chunkEndY = chunkStartY + CHUNK_SIZE - 1;

            if (startTileX <= chunkEndX && endTileX >= chunkStartX &&
                startTileY <= chunkEndY && endTileY >= chunkStartY) {

                for (let y = startTileY; y <= endTileY; y++) {
                    for (let x = startTileX; x <= endTileX; x++) {
                        const chunkX = x - chunkStartX;
                        const chunkY = y - chunkStartY;

                        if (chunkX >= 0 && chunkX < CHUNK_SIZE &&
                            chunkY >= 0 && chunkY < CHUNK_SIZE) {
                            const tileId = chunk.tiles[chunkY][chunkX];

                            if (tileId !== 0) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        // Коллизий не обнаружено
        return false;
    }

    update(time: number): void {


    }

    applyGravity(time: number, chunks: Chunk[]): void {
        const gravity = 0.98; // Ускорение свободного падения
        const deltaTime = time / 1000; // Преобразуем время в секунды

        // Применяем гравитацию
        this.#vel = this.#vel.add(new Vector2(0, -(gravity * deltaTime)));

        // Обновляем позицию
        this.#pos = this.#pos.add(this.#vel.multiply(deltaTime));

        // Проверка коллизий
        if (this.isCollision(chunks)) {
            // Если есть коллизия, останавливаем падение
            this.#vel = new Vector2(this.#vel.getX(), 0);
            this.#pos = new Vector2(this.#pos.getX(), Math.floor(this.#pos.getY() / Chunk.TILE_SIZE) * Chunk.TILE_SIZE);
        }
    }

    render(screen: Screen): void {
        const layer = screen.getLayer(1).getContext();
        const finalCords = screen.getCamera().atCanvas(this.#pos);
        layer.fillStyle = this.#color;
        layer.fillRect(finalCords.getFloorX(), finalCords.getFloorY(), this.#width, this.#height);
    }
}