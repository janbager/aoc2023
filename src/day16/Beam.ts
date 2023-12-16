interface VectorInterface {
    x: number
    y: number
}

export interface BeamInterface extends VectorInterface {
    direction: VectorInterface
    active: boolean
}

export class Beam implements BeamInterface {
    x: number
    y: number
    active: boolean = true
    direction: VectorInterface

    constructor(x: number, y: number, direction: VectorInterface) {
        this.x = x
        this.y = y
        this.direction = direction
    }
}
