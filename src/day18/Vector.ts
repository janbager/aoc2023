import {VectorInterface} from './interfaces'

enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R',
}

export class Vector implements VectorInterface {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static fromDirectionAndLength(direction: string, length: number): VectorInterface {
        switch (direction) {
            case Direction.Up:
                return new Vector(0, -length)
            case Direction.Down:
                return new Vector(0, length)
            case Direction.Left:
                return new Vector(-length, 0)
            case Direction.Right:
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
