import { Beam, BeamInterface } from './Beam'
import { ElementInterface } from './Element'

interface ControllerInterface {
    grid: ElementInterface[][]
    gridWidth: number
    gridHeight: number
    energized: boolean[][]
    beams: Beam[]
}

export class Controller implements ControllerInterface {
    beams: Beam[] = []
    grid: ElementInterface[][]
    gridWidth: number = 0
    gridHeight: number = 0
    energized: boolean[][]

    constructor(elements: ElementInterface[][], initialBeam: BeamInterface) {
        this.grid = elements
        this.beams.push(initialBeam)
        this.energized = elements.map((row) => row.map(() => false))
        this.gridHeight = elements.length
        this.gridWidth = elements[0].length
    }

    public activate(beam: BeamInterface): void {
        if (beam.x >= 0 && beam.x < this.grid.length && beam.y >= 0 && beam.y < this.grid[beam.x].length) {
            this.energized[beam.x][beam.y] = true
        }
    }

    public hasActiveBeams(): boolean {
        return this.beams.some((beam) => beam.active)
    }

    public update() {
        let iterationIndex = 0
        while (this.beams.length > 0 && this.hasActiveBeams()) {
            this.beams.forEach((beam, index) => {
                if (beam.active) {
                    if (beam.x < 0 || beam.x >= this.gridWidth || beam.y < 0 || beam.y >= this.gridHeight) {
                        beam.active = false
                    } else {
                        this.energized[beam.y][beam.x] = true
                    }
                    const beams = this.grid[beam.y][beam.x].modify(beam)
                    if (beams.length > 1) {
                        const newBeam = beams[1]
                        if (
                            newBeam.x < 0 ||
                            newBeam.x >= this.gridWidth ||
                            newBeam.y < 0 ||
                            newBeam.y >= this.gridHeight
                        ) {
                            newBeam.active = false
                        } else {
                            this.energized[newBeam.y][newBeam.x] = true
                        }
                        this.beams.push(newBeam)
                    }
                }
            })
            console.log(`run: ${iterationIndex++}`)
        }
    }
}
