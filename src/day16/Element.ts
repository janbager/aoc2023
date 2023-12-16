import { Beam, BeamInterface } from './Beam'
import { cloneDeep } from 'lodash'

export enum ElementModifier {
    mirror_tl_br = '\\',
    mirror_tr_bl = '/',
    splitter_h = '-',
    splitter_v = '|',
    empty = '.',
}

export interface ElementInterface {
    modifier: string
    modify: (input: BeamInterface) => BeamInterface[]
}

export class Element implements ElementInterface {
    modifier: string

    constructor(modifier: string) {
        this.modifier = modifier
    }

    public mirrorTlBr(beam: BeamInterface): BeamInterface[] {
        if ((beam.direction.x === 1 || beam.direction.x === -1) && beam.direction.y === 0) {
            // horizontal
            if (beam.direction.x === 1) {
                beam.direction.x = 0
                beam.direction.y = 1
            } else {
                beam.direction.x = 0
                beam.direction.y = -1
            }
        } else {
            // vertical
            if (beam.direction.y === 1) {
                beam.direction.x = 1
                beam.direction.y = 0
            } else {
                beam.direction.x = -1
                beam.direction.y = 0
            }
        }
        beam.x += beam.direction.x
        beam.y += beam.direction.y
        return [beam]
    }

    public mirrorTrBl(beam: BeamInterface): BeamInterface[] {
        if ((beam.direction.x === 1 || beam.direction.x === -1) && beam.direction.y === 0) {
            // horizontal
            if (beam.direction.x === 1) {
                beam.direction.x = 0
                beam.direction.y = -1
            } else {
                beam.direction.x = 0
                beam.direction.y = 1
            }
        } else {
            // vertical
            if (beam.direction.y === 1) {
                beam.direction.x = -1
                beam.direction.y = 0
            } else {
                beam.direction.x = 1
                beam.direction.y = 0
            }
        }
        beam.x += beam.direction.x
        beam.y += beam.direction.y
        return [beam]
    }

    public splitterH(beam: BeamInterface): BeamInterface[] {
        if (beam.direction.x === 0 && beam.direction.y !== 0) {
            // vertical
            const newBeam: BeamInterface = cloneDeep(beam)
            if (beam.direction.y === 1) {
                beam.direction.x = 1
                beam.direction.y = 0
                newBeam.direction.x = -1
                newBeam.direction.y = 0
            } else {
                beam.direction.x = -1
                beam.direction.y = 0
                newBeam.direction.x = 1
                newBeam.direction.y = 0
            }
            newBeam.x += newBeam.direction.x
            newBeam.y += newBeam.direction.y
            beam.x += beam.direction.x
            beam.y += beam.direction.y
            return [beam, newBeam]
        }
        beam.x += beam.direction.x
        beam.y += beam.direction.y
        return [beam]
    }

    public splitterV(beam: BeamInterface): BeamInterface[] {
        if (beam.direction.x !== 0 && beam.direction.y === 0) {
            // vertical
            const newBeam: BeamInterface = cloneDeep(beam)
            if (beam.direction.x === 1) {
                beam.direction.x = 0
                beam.direction.y = 1
                newBeam.direction.y = -1
                newBeam.direction.x = 0
            } else {
                beam.direction.x = 0
                beam.direction.y = -1
                newBeam.direction.x = 0
                newBeam.direction.y = 1
            }
            newBeam.x += newBeam.direction.x
            newBeam.y += newBeam.direction.y
            beam.x += beam.direction.x
            beam.y += beam.direction.y
            return [beam, newBeam]
        }
        beam.x += beam.direction.x
        beam.y += beam.direction.y
        return [beam]
    }

    public empty(beam: BeamInterface): BeamInterface[] {
        beam.x += beam.direction.x
        beam.y += beam.direction.y
        return [beam]
    }

    public modify(input: BeamInterface): BeamInterface[] {
        switch (this.modifier) {
            case ElementModifier.mirror_tl_br:
                return this.mirrorTlBr(input)
            case ElementModifier.mirror_tr_bl:
                return this.mirrorTrBl(input)
            case ElementModifier.splitter_h:
                return this.splitterH(input)
            case ElementModifier.splitter_v:
                return this.splitterV(input)
            case ElementModifier.empty:
            default:
                return this.empty(input)
        }
    }
}
