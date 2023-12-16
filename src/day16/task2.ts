import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { Element } from './Element'
import { Beam } from './Beam'
import { Controller } from './Controller'

export const task2 = () => {
    console.log('running day16 task2')
    const data = loadData('src/day16/input.data')
    const lines = splitLines(data)

    console.log(lines)

    const elements: Element[][] = []
    lines.map((line, y) => {
        elements.push([])
        line.split('').map((char, x) => {
            elements[y].push(new Element(char))
        })
    })

    const initialBeamsLeft: Beam[] = []
    const initialBeamsRight: Beam[] = []
    const initialBeamsTop: Beam[] = []
    const initialBeamsBottom: Beam[] = []
    for (let y = 0; y < elements.length; y++) {
        initialBeamsLeft.push(new Beam(0, y, { x: 1, y: 0 }))
        initialBeamsRight.push(new Beam(elements[0].length - 1, y, { x: -1, y: 0 }))
    }
    for (let x = 0; x < elements[0].length; x++) {
        initialBeamsTop.push(new Beam(x, 0, { x: 0, y: 1 }))
        initialBeamsBottom.push(new Beam(x, elements.length - 1, { x: 0, y: -1 }))
    }

    const result: number[] = []
    initialBeamsLeft.forEach((initialBeam) => {
        const controller = new Controller(elements, initialBeam)
        controller.update()
        result.push(controller.countEnergized())
    })
    initialBeamsTop.forEach((initialBeam) => {
        const controller = new Controller(elements, initialBeam)
        controller.update()
        result.push(controller.countEnergized())
    })
    /*
    // right and bottom start vectors lead to infinite loop
        initialBeamsRight.forEach((initialBeam) => {
            const controller = new Controller(elements, initialBeam)
            controller.update()
            result.push(controller.countEnergized())
        })
        initialBeamsBottom.forEach((initialBeam) => {
            const controller = new Controller(elements, initialBeam)
            controller.update()
            result.push(controller.countEnergized())
        })
     */
    console.log(result.reduce((a, b) => (a > b ? a : b), 0))
}
