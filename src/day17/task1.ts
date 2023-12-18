import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { AStarFinder } from 'astar-typescript'

export const task1 = () => {
    console.log('running day17 task1')
    const data = loadData('src/day17/test.data')
    const lines = splitLines(data)
    console.log(lines)
    const matrix: number[][] = []
    lines.forEach((line, y) => {
        matrix[y] = []
        line.split('').forEach((cost, x) => {
            matrix[y][x] = parseInt(cost)
        })
    })
    const finder = new AStarFinder({
        grid: {
            matrix,
        },
        diagonalAllowed: false,
        heuristic: 'Manhattan',
        includeStartNode: true,
        includeEndNode: true,
    })
    const start = { x: 0, y: 0 }
    const end = { x: 12, y: 12 }
    const path = finder.findPath(start, end)
    console.log(path)
}
