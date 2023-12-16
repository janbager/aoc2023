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

    constructor(elements: ElementInterface[][], initialBeam: Beam) {
        this.grid = elements
        this.beams.push(initialBeam)
        this.energized = elements.map((row) => row.map(() => false))
        this.gridHeight = elements.length
        this.gridWidth = elements[0].length
    }

    public hasActiveBeams(): boolean {
        return this.beams.some((beam) => beam.active)
    }

    public countActiveBeams(): number {
        return this.beams.filter((beam) => beam.active).length
    }

    public isOutOfBounds(beam: BeamInterface): boolean {
        return beam.x < 0 || beam.x >= this.gridWidth || beam.y < 0 || beam.y >= this.gridHeight
    }

    public countEnergized(): number {
        let count = 0
        this.energized.forEach((row) => row.forEach((cell) => (cell ? count++ : null)))
        return count
    }

    public isNewBeam(beam: BeamInterface): boolean {
        return this.beams.filter((b) => b.hash === beam.hash).length === 0
    }

    public echoEnergized(): string {
        let result = ''
        this.energized.forEach((row) => {
            row.forEach((cell) => {
                result += cell ? '#' : '.'
            })
            result += '\n'
        })
        return result
    }

    public update() {
        while (this.hasActiveBeams()) {
            this.beams
                .filter((beam) => beam.active)
                .forEach((beam) => {
                    if (this.isOutOfBounds(beam)) {
                        beam.active = false
                        return
                    }
                    this.energized[beam.y][beam.x] = true
                    const beams: BeamInterface[] = this.grid[beam.y][beam.x].modify(beam)
                    if (beams.length > 1) {
                        const newBeam: BeamInterface = beams[1]
                        if (!this.isOutOfBounds(newBeam) && this.isNewBeam(newBeam)) {
                            this.energized[newBeam.y][newBeam.x] = true
                            this.beams.push(newBeam as Beam)
                        }
                    }
                })
        }
    }
}
