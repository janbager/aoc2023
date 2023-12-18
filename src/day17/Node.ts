import { PointInterface } from './interfaces'

export interface NodeInterface extends PointInterface {
    cost: number
    total: number
    remaining: number
    parent: NodeInterface | null
}

export class Node implements NodeInterface {
    x: number
    y: number
    cost: number = 0 // current costs
    total: number = 0 // total cost from start
    remaining: number = 0 // heuristic cost to end
    parent: NodeInterface | null = null

    constructor(x: number, y: number, cost: number) {
        this.x = x
        this.y = y
        this.cost = cost
    }

    public calculateRemaining(end: PointInterface) {
        return Math.abs(end.x - this.x) + Math.abs(end.y - this.y) // Manhattan distance
    }

    updateRemaining(end: PointInterface) {
        this.remaining = this.calculateRemaining(end)
    }

    public setTotal(total: number) {
        this.total = total
    }
}
