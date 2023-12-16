interface VectorInterface {
    x: number
    y: number
}

export interface BeamInterface extends VectorInterface {
    direction: VectorInterface
    active: boolean
    initialPosition: VectorInterface
    initialDirection: VectorInterface
    hash: string

    next(): void

    createHash(): string
}

export class Beam implements BeamInterface {
    x: number
    y: number
    active: boolean = true
    hash: string = ''
    direction: VectorInterface
    initialPosition: VectorInterface = { x: 0, y: 0 }
    initialDirection: VectorInterface = { x: 1, y: 0 }

    constructor(x: number, y: number, direction: VectorInterface) {
        this.x = x
        this.y = y
        this.direction = direction
        this.initialPosition = { x, y }
        this.initialDirection = { ...direction }
        this.hash = this.createHash()
    }

    public createHash(): string {
        return `${this.initialPosition.x},${this.initialPosition.y}|${this.initialDirection.x},${this.initialDirection.y}`
    }

    public next() {
        this.x += this.direction.x
        this.y += this.direction.y
    }
}
