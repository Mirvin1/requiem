
export default class Vector2 {

    #x: number;

    #y: number;

    constructor(x: number, y: number) {
        this.#x = x;
        this.#y = y;
    }

    getX(): number {
        return this.#x;
    }

    getY(): number {
        return this.#y;
    }

    getFloorX(): number {
        return Math.floor(this.#x);
    }

    getFloorY(): number {
        return Math.floor(this.#y);
    }

    add(vector: Vector2): Vector2 {
        return new Vector2(this.#x + vector.#x, this.#y + vector.#y);
    }

    subtract(vector: Vector2): Vector2 {
        return new Vector2(this.#x - vector.#x, this.#y - vector.#y);
    }

    ceil(): Vector2 {
        return new Vector2(Math.ceil(this.#x), Math.ceil(this.#y));
    }

    floor(): Vector2 {
        return new Vector2(Math.floor(this.#x), Math.floor(this.#y));
    }

    round(): Vector2 {
        return new Vector2(Math.round(this.#x), Math.round(this.#y));
    }

    rotate(center: Vector2, degrees: number) {
        const radians = degrees * (Math.PI / 180);
        const cosTheta = Math.cos(radians);
        const sinTheta = Math.sin(radians);

        const translatedX = this.#x - center.getX();
        const translatedY = this.#y - center.getY();

        const newX = translatedX * cosTheta - translatedY * sinTheta;
        const newY = translatedX * sinTheta + translatedY * cosTheta;
        
        return new Vector2(newX + center.getX(), newY + center.getY());
    }

    abs(): Vector2 {
        return new Vector2(Math.abs(this.#x), Math.abs(this.#y));
    }

    multiply(number: number): Vector2 {
        return new Vector2(this.#x * number, this.#y * number);
    }

    divide(number: number): Vector2 {
        return new Vector2(this.#x / number, this.#y / number);
    }

    distance(vector: Vector2): number {
        return Math.sqrt(this.distanceSquared(vector));
    }

    distanceSquared(vector: Vector2): number {
        const dx = this.#x - vector.#x;
        const dy = this.#y - vector.#y;
        return (dx * dx) + (dy * dy);
    }

    length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared(): number {
        return this.#x * this.#x + this.#y * this.#y;
    }

    normalize(): Vector2 {
        const len = this.lengthSquared();
        if (len > 0) {
            return this.divide(Math.sqrt(len));
        }
        return new Vector2(0, 0);
    }

    dot(vector: Vector2): number {
        return this.#x * vector.#x + this.#y * vector.#y;
    }
}