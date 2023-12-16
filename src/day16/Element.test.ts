import { Element, ElementModifier } from './Element'
import { Beam } from './Beam'

describe('Element', () => {
    describe('Check for horizontal beams', () => {
        let beam: Beam
        let beamLeft: Beam
        beforeEach(() => {
            beam = new Beam(0, 0, { x: 1, y: 0 })
            beamLeft = new Beam(1, 0, { x: -1, y: 0 })
        })

        afterEach(() => {})

        it('empty element keeps direction', () => {
            const element = new Element(ElementModifier.empty)
            expect(element.modify(beam)).toEqual([
                {
                    x: 1,
                    y: 0,
                    direction: { x: 1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 1, y: 0 },
                    hash: '0,0|1,0',
                },
            ])
            expect(element.modify(beamLeft)).toEqual([
                {
                    x: 0,
                    y: 0,
                    direction: { x: -1, y: 0 },
                    active: true,
                    initialPosition: { x: 1, y: 0 },
                    initialDirection: { x: -1, y: 0 },
                    hash: '1,0|-1,0',
                },
            ])
        })
        it('horizontal splitter element keeps direction', () => {
            const element = new Element(ElementModifier.splitter_h)
            expect(element.modify(beam)).toEqual([
                {
                    x: 1,
                    y: 0,
                    direction: { x: 1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 1, y: 0 },
                    hash: '0,0|1,0',
                },
            ])
            expect(element.modify(beamLeft)).toEqual([
                {
                    x: 0,
                    y: 0,
                    direction: { x: -1, y: 0 },
                    active: true,
                    initialPosition: { x: 1, y: 0 },
                    initialDirection: { x: -1, y: 0 },
                    hash: '1,0|-1,0',
                },
            ])
        })
        it('vertical splitter element should create 2 beams', () => {
            const element = new Element(ElementModifier.splitter_v)
            expect(element.modify(beam)).toEqual([
                {
                    x: 0,
                    y: 1,
                    direction: { x: 0, y: 1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 1, y: 0 },
                    hash: '0,0|1,0',
                },
                {
                    x: 0,
                    y: -1,
                    direction: { x: 0, y: -1 },
                    active: true,
                    initialPosition: { x: 0, y: -1 },
                    initialDirection: { x: 0, y: -1 },
                    hash: '0,-1|0,-1',
                },
            ])
            expect(element.modify(beamLeft)).toEqual([
                {
                    x: 1,
                    y: -1,
                    direction: { x: 0, y: -1 },
                    active: true,
                    initialPosition: { x: 1, y: 0 },
                    initialDirection: { x: -1, y: 0 },
                    hash: '1,0|-1,0',
                },
                {
                    x: 1,
                    y: 1,
                    direction: { x: 0, y: 1 },
                    active: true,
                    initialPosition: { x: 1, y: 1 },
                    initialDirection: { x: 0, y: 1 },
                    hash: '1,1|0,1',
                },
            ])
        })
        it('tl-br mirror element should rotates direction 90 degrees', () => {
            const element = new Element(ElementModifier.mirror_tl_br)
            expect(element.modify(beam)).toEqual([
                {
                    x: 0,
                    y: 1,
                    direction: { x: 0, y: 1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 1, y: 0 },
                    hash: '0,0|1,0',
                },
            ])
            expect(element.modify(beamLeft)).toEqual([
                {
                    x: 1,
                    y: -1,
                    direction: { x: 0, y: -1 },
                    active: true,
                    initialPosition: { x: 1, y: 0 },
                    initialDirection: { x: -1, y: 0 },
                    hash: '1,0|-1,0',
                },
            ])
        })
        it('tr-bl mirror element should rotates direction 90 degrees counter clockwise', () => {
            const element = new Element(ElementModifier.mirror_tr_bl)
            expect(element.modify(beam)).toEqual([
                {
                    x: 0,
                    y: -1,
                    direction: { x: 0, y: -1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 1, y: 0 },
                    hash: '0,0|1,0',
                },
            ])
            expect(element.modify(beamLeft)).toEqual([
                {
                    x: 1,
                    y: 1,
                    direction: { x: 0, y: 1 },
                    active: true,
                    initialPosition: { x: 1, y: 0 },
                    initialDirection: { x: -1, y: 0 },
                    hash: '1,0|-1,0',
                },
            ])
        })
    })

    describe('Check for vertical beams', () => {
        let beam: Beam
        let beamUp: Beam
        beforeEach(() => {
            beam = new Beam(0, 0, { x: 0, y: 1 })
            beamUp = new Beam(0, 0, { x: 0, y: -1 })
        })

        afterEach(() => {})

        it('empty element keeps direction', () => {
            const element = new Element(ElementModifier.empty)
            expect(element.modify(beam)).toEqual([
                {
                    x: 0,
                    y: 1,
                    direction: { x: 0, y: 1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: 1 },
                    hash: '0,0|0,1',
                },
            ])
            expect(element.modify(beamUp)).toEqual([
                {
                    x: 0,
                    y: -1,
                    direction: { x: 0, y: -1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: -1 },
                    hash: '0,0|0,-1',
                },
            ])
        })
        it('vertical splitter element keeps direction', () => {
            const element = new Element(ElementModifier.splitter_v)
            expect(element.modify(beam)).toEqual([
                {
                    x: 0,
                    y: 1,
                    direction: { x: 0, y: 1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: 1 },
                    hash: '0,0|0,1',
                },
            ])
            expect(element.modify(beamUp)).toEqual([
                {
                    x: 0,
                    y: -1,
                    direction: { x: 0, y: -1 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: -1 },
                    hash: '0,0|0,-1',
                },
            ])
        })
        it('horizontal splitter element should create 2 beams', () => {
            const element = new Element(ElementModifier.splitter_h)
            expect(element.modify(beam)).toEqual([
                {
                    x: 1,
                    y: 0,
                    direction: { x: 1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: 1 },
                    hash: '0,0|0,1',
                },
                {
                    x: -1,
                    y: 0,
                    direction: { x: -1, y: 0 },
                    active: true,
                    initialPosition: { x: -1, y: 0 },
                    initialDirection: { x: -1, y: 0 },
                    hash: '-1,0|-1,0',
                },
            ])
            expect(element.modify(beamUp)).toEqual([
                {
                    x: -1,
                    y: 0,
                    direction: { x: -1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: -1 },
                    hash: '0,0|0,-1',
                },
                {
                    x: 1,
                    y: 0,
                    direction: { x: 1, y: 0 },
                    active: true,
                    initialPosition: { x: 1, y: 0 },
                    initialDirection: { x: 1, y: 0 },
                    hash: '1,0|1,0',
                },
            ])
        })
        it('tl-br mirror element should rotates direction 90 degrees', () => {
            const element = new Element(ElementModifier.mirror_tl_br)
            expect(element.modify(beam)).toEqual([
                {
                    x: 1,
                    y: 0,
                    direction: { x: 1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: 1 },
                    hash: '0,0|0,1',
                },
            ])
            expect(element.modify(beamUp)).toEqual([
                {
                    x: -1,
                    y: 0,
                    direction: { x: -1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: -1 },
                    hash: '0,0|0,-1',
                },
            ])
        })
        it('tr-bl mirror element should rotates direction 90 degrees counter clockwise', () => {
            const element = new Element(ElementModifier.mirror_tr_bl)
            expect(element.modify(beam)).toEqual([
                {
                    x: -1,
                    y: 0,
                    direction: { x: -1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: 1 },
                    hash: '0,0|0,1',
                },
            ])
            expect(element.modify(beamUp)).toEqual([
                {
                    x: 1,
                    y: 0,
                    direction: { x: 1, y: 0 },
                    active: true,
                    initialPosition: { x: 0, y: 0 },
                    initialDirection: { x: 0, y: -1 },
                    hash: '0,0|0,-1',
                },
            ])
        })
    })
})
