import { NodeInterface } from './Node'

interface ControllerInterface {
    map: NodeInterface[][]
    mapHeight: number
    mapWidth: number
    path: NodeInterface[]
    start: NodeInterface
    end: NodeInterface
}

export class PathFinder implements ControllerInterface {
    map: NodeInterface[][] = []
    mapHeight: number = 0
    mapWidth: number = 0
    start: NodeInterface
    end: NodeInterface
    path: NodeInterface[] = []
    openNodes: NodeInterface[] = []
    closedNodes: NodeInterface[] = []

    constructor(map: NodeInterface[][], start: NodeInterface, end: NodeInterface) {
        this.map = map
        this.mapHeight = map.length
        this.mapWidth = map[0].length
        this.start = start
        this.end = end
        this.path.push(start)
        this.openNodes.push(start)
    }

    public endReached(): boolean {
        // remove later on
        if (this.path.length === 0) {
            return true
        }
        return this.path[this.path.length - 1].x === this.end.x && this.path[this.path.length - 1].y === this.end.y
    }

    public getNeighbours(cell: NodeInterface): NodeInterface[] {
        const neighbours: NodeInterface[] = []
        if (cell.x > 0) {
            neighbours.push(this.map[cell.y][cell.x - 1])
        }
        if (cell.x < this.mapWidth - 1) {
            neighbours.push(this.map[cell.y][cell.x + 1])
        }
        if (cell.y > 0) {
            neighbours.push(this.map[cell.y - 1][cell.x])
        }
        if (cell.y < this.mapHeight - 1) {
            neighbours.push(this.map[cell.y + 1][cell.x])
        }
        return neighbours
    }

    public search(current: NodeInterface): NodeInterface[] {
        const neighbours = this.getNeighbours(current)
        if (neighbours.length === 0) {
            return [] as NodeInterface[]
        }
        while (this.openNodes.length > 0) {
            const current = this.openNodes.shift()
            if (current === undefined) {
                break
            }
            if (current === this.end) {
                this.path.push(current)
                return this.path
            }
            this.closedNodes.push(current)
        }
        const sorted = neighbours.sort((a, b) => (a.cost > b.cost ? 1 : -1))
        console.log('Sorted nodes: ', sorted)
        return this.path
    }

    public update() {
        let iterations: number = 0
        while (!this.endReached() && iterations < 100) {
            const newPath = this.search(this.path[this.path.length - 1])
            console.log(newPath)
            ++iterations
            console.log('iteration', iterations, this.endReached())
        }
    }
}
