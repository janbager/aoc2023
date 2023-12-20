import {PointInterface} from './interfaces'

export class Point implements PointInterface {
    x: number
    y: number
    color: string = ''
    value: string = '.'

    constructor(x: number, y: number, color: string, value: string) {
        this.x = x
        this.y = y
        this.color = color
        this.value = value
    }

    public key(): string {
        return `${this.x},${this.y}`
    }
}
