import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { Element } from './Element'
import { Beam } from './Beam'
import { Controller } from './Controller'

export const task1 = () => {
    console.log('running day16 task1')
    const data = loadData('src/day16/test.data')
    const lines = splitLines(data)
    const elements: Element[][] = []
    lines.map((line, y) => {
        elements.push([])
        line.split('').map((char, x) => {
            elements[y].push(new Element(char))
        })
    })

    const initialBeam = new Beam(0, 0, { x: 1, y: 0 })

    console.log(initialBeam)
    console.log(lines)
    const controller = new Controller(elements, initialBeam)
    controller.run()
}
