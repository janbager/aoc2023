import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { Controller } from './Controller'
import { Element } from './Element'
import { Beam } from './Beam'

describe('Controller', () => {
    let controller: Controller
    beforeEach(() => {
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
        controller = new Controller(elements, initialBeam)
    })

    afterEach(() => {})

    it('should be initialized', () => {
        expect(controller.gridHeight).toEqual(10)
        expect(controller.gridWidth).toEqual(10)
        expect(controller.beams.length).toEqual(1)
        expect(controller.beams).toEqual([{ x: 0, y: 0, direction: { x: 1, y: 0 }, active: true }])
    })
})
