import loadData from '../utils/loadData'
import writeData from '../utils/writeData'
import splitLines from '../utils/splitLines'
import {PointInterface} from './interfaces'
import {Point} from './Point'
import {Vector} from './Vector'
import {Line} from './Line'
import {Map} from './Map'

export const task1 = () => {
    console.log('running day18 task1')
    const data = loadData('src/day18/input.data')
    const lines = splitLines(data)
    console.log(lines)

    const rawData = lines.map((line) => line.split(' '))

    let path: PointInterface[] = []
    rawData.map((line, y) => {
        const direction = Vector.fromDirectionAndLength(line[0], parseInt(line[1]))
        if (path.length === 0) {
            path.push(new Point(0, 0, line[2], '#'))
        }
        let start = path[path.length - 1]
        const linePoints = new Line(start, direction).draw()
        path = path.concat(linePoints)
    })
    // remove last point because its duplicate
    path = path.slice(0, path.length - 1)
    //    console.log(path)
    const map = new Map(path)

    console.log(map.gridWidth, map.gridHeight)
    console.log(map.toString())

//    map.fill(map.path[0].x + 1, map.path[0].y + 1, '#', '.')
//    console.log('Filled map')
//    console.log(map.toString())
    writeData('./output.txt', map.toString())

    console.log(map.getVolume())
    console.log(path)
}
