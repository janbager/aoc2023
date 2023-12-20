import {PointInterface, VectorInterface} from './interfaces'
import {Point} from './Point'

interface LineInterface {
    start: PointInterface
    direction: VectorInterface
}

export class Line implements LineInterface {
    start: PointInterface
    direction: VectorInterface

    constructor(start: PointInterface, direction: VectorInterface) {
        this.start = start
        this.direction = direction
    }

    public getEnd(): PointInterface {
        return new Point(
            this.start.x + this.direction.x,
            this.start.y + this.direction.y,
            this.start.color,
            this.start.value
        )
    }

    public draw(): PointInterface[] {
        if (this.direction.x === 0 && this.direction.y === 0) {
            return [this.start]
        }

        if (this.direction.x !== 0 && this.direction.y !== 0) {
            throw new Error('Cannot draw diagonal line')
        }

        const points: PointInterface[] = []
        if (this.direction.x !== 0) {
            const xDirection = this.direction.x > 0 ? 1 : -1
            for (
                let x = this.start.x + xDirection;
                x !== this.start.x + this.direction.x + xDirection;
                x += xDirection
            ) {
                points.push(new Point(x, this.start.y, this.start.color, this.start.value))
            }
        }

        if (this.direction.y !== 0) {
            const yDirection = this.direction.y > 0 ? 1 : -1
            for (
                let y = this.start.y + yDirection;
                y !== this.start.y + this.direction.y + yDirection;
                y += yDirection
            ) {
                points.push(new Point(this.start.x, y, this.start.color, this.start.value))
            }
        }

        return points
    }
}
