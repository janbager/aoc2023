import {PointInterface} from './interfaces'
import {Point} from './Point'
import {HashMap} from "../utils/types";

interface MapInterface {
    points: HashMap<PointInterface>
    gridHeight: number
    gridWidth: number
    path: PointInterface[]
    pathMap: HashMap<PointInterface>
    pathPolygon: PointInterface[]
    visited: PointInterface[]
    filled: HashMap<PointInterface>
}

export class Map implements MapInterface {
    points: HashMap<Point> = {}
    path: PointInterface[] = []
    pathMap: HashMap<PointInterface> = {}
    pathPolygon: PointInterface[] = []
    gridHeight: number = 0
    gridWidth: number = 0
    visited: PointInterface[] = []
    filled: HashMap<PointInterface> = {}

    constructor(path: PointInterface[], polygon: PointInterface[]) {

        this.path = path
        this.pathPolygon = polygon
        this.init()
    }

    public init(): void {
        const minY = this.path.reduce((min, point) => (point.y < min ? point.y : min), 0)
        const minX = this.path.reduce((min, point) => (point.x < min ? point.x : min), 0)
        const maxY = this.path.reduce((max, point) => (point.y > max ? point.y : max), 0)
        const maxX = this.path.reduce((max, point) => (point.x > max ? point.x : max), 0)
        const offsetX = minX === 0 ? 0 : -minX
        const offsetY = minY === 0 ? 0 : -minY

        // normalize path and the polygon
        if (minX < 0 || minY < 0) {
            this.path.forEach((point) => {
                point.x += offsetX
                point.y += offsetY
            })
            this.pathPolygon.forEach((point) => {
                point.x += offsetX
                point.y += offsetY
            })
        }

        // create path map for faster search
        this.path.forEach((point) => {
            this.pathMap[point.key()] = point.clone()
        })

        this.gridHeight = Math.abs(minY) + Math.abs(maxY) + 1
        this.gridWidth = Math.abs(minX) + Math.abs(maxX) + 1

        // fill hash map with points
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.pathMap[`${x},${y}`]) {
                    this.points[`${x},${y}`] = this.pathMap[`${x},${y}`]
                } else {
                    const newPoint = new Point(x, y, '', '.')
                    this.points[newPoint.key()] = newPoint
                }
            }
        }
    }

    public isPointInPolygon(point: PointInterface): boolean {
        const latitude = point.x
        const longitude = point.y

        let inside = false
        for (let i = 0, j = this.pathPolygon.length - 1; i < this.pathPolygon.length; j = i++) {
            const xi = this.pathPolygon[i].x
            const yi = this.pathPolygon[i].y
            const xj = this.pathPolygon[j].x
            const yj = this.pathPolygon[j].y

            //console.log('xi:', xi, 'yi:', yi, 'xj:', xj, 'yj:', yj, 'latitude:', latitude, 'longitude:', longitude)
            const intersect = ((yi > longitude) !== (yj > longitude)) &&
                (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi)
            if (intersect) {
                inside = !inside
            }
        }
        return inside
    }

    public getVolume(): number {
        return Object.values(this.points).reduce((volume, current) => volume + (current.value === '#' ? 1 : 0), 0)
    }

    public getNeighbours(x: number, y: number) {
        const neighbours: PointInterface[] = []

        if (x > 0 && x < this.gridWidth - 1 && y > 0 && y < this.gridHeight - 1) {
            neighbours.push(this.points[`${x - 1},${y - 1}`])
            neighbours.push(this.points[`${x - 1},${y}`])
            neighbours.push(this.points[`${x - 1},${y + 1}`])
            neighbours.push(this.points[`${x},${y - 1}`])
            neighbours.push(this.points[`${x},${y + 1}`])
            neighbours.push(this.points[`${x + 1},${y - 1}`])
            neighbours.push(this.points[`${x + 1},${y}`])
            neighbours.push(this.points[`${x + 1},${y + 1}`])
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
        if (this.filled[`${x},${y}`]) {
            return
        }
        if (this.points[`${x},${y}`].value !== prev) {
            return
        }
        this.points[`${x},${y}`].value = value
        this.filled[`${x},${y}`] = this.points[`${x},${y}`]
        this.visited.push(this.points[`${x},${y}`])

        this.getNeighbours(x, y).forEach((neighbour) => {
            const alreadyVisited = this.visited.filter(
                (value) => value.y === neighbour.x && value.x === neighbour.y && value.value === neighbour.value && !this.filled[neighbour.key()]
            )
            if (alreadyVisited.length === 0) {
                return this.fill(neighbour.x, neighbour.y, value, prev)
            }
        })
    }

    public fillPath(): void {
        Object.values(this.points).forEach((point) => {
            if (this.isPointInPolygon(point)) {
                this.points[point.key()].value = '#'
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
