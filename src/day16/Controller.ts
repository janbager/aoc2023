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
        this.activate(initialBeam)
    }

    public activate(beam: BeamInterface): void {
        if (beam.x >= 0 && beam.x < this.grid.length && beam.y >= 0 && beam.y < this.grid[beam.x].length) {
            this.energized[beam.x][beam.y] = true
        }
    }

    public hasActiveBeams(): boolean {
        return this.beams.some((beam) => beam.active)
    }

    public run() {
        console.log(this.beams)
        while (this.beams.length > 0 && this.hasActiveBeams()) {
            console.log(this.hasActiveBeams())
            this.beams.map((beam) => {
                if (beam.active === true) {
                    if (beam.x < 0 || beam.x >= this.gridWidth || beam.y < 0 || beam.y >= this.gridHeight) {
                        beam.disable()
                    }
                    const beams = this.grid[beam.y][beam.x].modify(beam)
                    console.log(beams)
                    if (beams.length > 1) {
                        if (
                            beams[1].x < 0 ||
                            beams[1].x >= this.grid[beams[1].y].length ||
                            beams[1].y < 0 ||
                            beams[1].y >= this.grid.length
                        ) {
                            console.log(beams[1])
                            beams[1].disable()
                        }
                        this.beams.push(beams[1])
                    }
                }
            })
        }
    }
}
