import loadData from '../utils/loadData'
import writeData from '../utils/writeData'
import splitLines from '../utils/splitLines'
import {PointInterface} from './interfaces'
import {Point} from './Point'
import {Vector} from './Vector'
import {Line} from './Line'
import {Map} from './Map'
import {HashMap} from "../utils/types";

export const task1 = () => {
    console.log('running day18 task1')
    const data = loadData('src/day18/input.data')
    const lines = splitLines(data)
    const rawData = lines.map((line) => line.split(' '))

    let path: PointInterface[] = []
    const polygon: PointInterface[] = []
    rawData.map((line, y) => {
        const direction = Vector.fromDirectionAndLength(line[0], parseInt(line[1]))
        if (path.length === 0) {
            path.push(new Point(0, 0, line[2], '#'))
            polygon.push(path[0].clone())
        }
        let start = path[path.length - 1]
        const linePoints = new Line(start, direction).draw()
        polygon.push(linePoints[linePoints.length - 1].clone())
        path = path.concat(linePoints)
    })
    // remove last point because its duplicate
    path = path.slice(0, path.length - 1)

    const map = new Map(path, polygon)
    map.fillPath()
    writeData('src/day18/output.txt', map.toString())

    console.log('Path volume:', path.length)
    console.log('Total volume: ', map.getVolume())
}
