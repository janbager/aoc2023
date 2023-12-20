import { VectorInterface } from './interfaces'

export class Vector implements VectorInterface {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static fromDirectionAndLength(direction: string, length: number): VectorInterface {
        switch (direction) {
            case 'U':
                return new Vector(0, -length)
            case 'D':
                return new Vector(0, length)
            case 'L':
                return new Vector(-length, 0)
            case 'R':
                return new Vector(length, 0)
            default:
                throw new Error(`Unknown direction ${direction}`)
        }
    }

    public add(vector: VectorInterface): VectorInterface {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    public multiply(scalar: number): VectorInterface {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    public equals(vector: VectorInterface): boolean {
        return this.x === vector.x && this.y === vector.y
    }

    public getManhattanDistance(): number {
        return Math.abs(this.x) + Math.abs(this.y)
    }
}
