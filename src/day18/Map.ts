import {PointInterface, VectorInterface} from './interfaces'
import {Point} from './Point'
import {Line} from './Line'
import {HashMap} from "../utils/types";

interface MapInterface {
    points: HashMap<PointInterface>
    grid: PointInterface[][]
    gridHeight: number
    gridWidth: number
    path: PointInterface[]
    visited: PointInterface[]
}

export enum Direction {
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R',
}

export class Map implements MapInterface {
    points: HashMap<Point> = {}
    grid: PointInterface[][] = []
    path: PointInterface[] = []
    gridHeight: number = 0
    gridWidth: number = 0
    visited: PointInterface[] = []

    constructor(path: PointInterface[]) {

        this.path = path
        this.init()
    }

    public init(): void {
        const minY = this.path.reduce((min, point) => (point.y < min ? point.y : min), 0)
        const minX = this.path.reduce((min, point) => (point.x < min ? point.x : min), 0)
        const maxY = this.path.reduce((max, point) => (point.y > max ? point.y : max), 0)
        const maxX = this.path.reduce((max, point) => (point.x > max ? point.x : max), 0)
        console.log(`minX: ${minX}, minY: ${minY}, maxX: ${maxX}, maxY: ${maxY}`)
        const offsetX = minX === 0 ? 0 : -minX
        const offsetY = minY === 0 ? 0 : -minY

        console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`)
        if (minX < 0 || minY < 0) {
            this.path.forEach((point) => {
                point.x += offsetX
                point.y += offsetY
            })

            console.log(this.path)
        }

        this.gridHeight = Math.abs(minY) + Math.abs(maxY) + 1
        this.gridWidth = Math.abs(minX) + Math.abs(maxX) + 1

        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                const pathItem = this.path.find((point) => point.x === x && point.y === y)
                if (pathItem) {
                    this.points[pathItem.key()] = pathItem
                } else {
                    const newPoint = new Point(x, y, '', '.')
                    this.points[newPoint.key()] = newPoint
                }
            }
        }
        console.log(Object.keys(this.points).length)
    }

    public drawLine(start: PointInterface, direction: VectorInterface): void {
        const line = new Line(start, direction)
        const points = line.draw()
        points.forEach((point: PointInterface) => {
            this.points[point.key()] = point
        })
    }

    public getVolume(): number {
        return Object.values(this.points).reduce((volume, current) => volume + (current.value === '#' ? 1 : 0), 0)
    }

    public getNeighbours(x: number, y: number) {
        const neighbours: PointInterface[] = []

        if (x > 0 && x < this.gridWidth - 1 && y > 0 && y < this.gridHeight - 1) {
            neighbours.push(this.points[`${y - 1},${x - 1}`])
            neighbours.push(this.points[`${y - 1},${x}`])
            neighbours.push(this.points[`${y - 1},${x + 1}`])
            neighbours.push(this.points[`${y},${x - 1}`])
            neighbours.push(this.points[`${y},${x + 1}`])
            neighbours.push(this.points[`${y + 1},${x - 1}`])
            neighbours.push(this.points[`${y + 1},${x}`])
            neighbours.push(this.points[`${y + 1},${x + 1}`])
        }

        return neighbours
    }

    public fill(x: number, y: number, value = '#', prev = '.'): void {
        if (x < 0 || x >= this.gridWidth) {
            return
        }
        if (y < 0 || y >= this.gridHeight) {
            return
        }
        if (this.points[`${y},${x}`].value !== prev) {
            return
        }
        this.points[`${y},${x}`].value = value
        this.visited.push(this.points[`${y},${x}`])

        this.getNeighbours(x, y).forEach((neighbour) => {
            const alreadyVisited = this.visited.filter(
                (value) => value.y === neighbour.x && value.x === neighbour.y && value.value === neighbour.value
            )
            if (alreadyVisited.length === 0) {
                return this.fill(neighbour.x, neighbour.y, value, prev)
            }
        })
    }

    public toString(): string {
        let text = ''
        for (let y = 0; y < this.gridHeight; y++) {
            let line = ''
            for (let x = 0; x < this.gridWidth; x++) {
                line += this.points[`${x},${y}`] ? this.points[`${x},${y}`].value : ''
            }
            text = `${text}${line}\n`
        }
        return text
    }
}
