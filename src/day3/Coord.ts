export interface CoordInterface {
    x: number
    y: number
}

export class Coord implements CoordInterface {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}
