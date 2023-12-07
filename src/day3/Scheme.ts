import { isNumeric } from '../utils/isNumeric'
import { isSymbol } from './isSymbol'
import { Coord } from './Coord'

export class Scheme {
    scheme: any[][]
    symbols: Coord[] = []
    numbers: Coord[] = []
    gears: Coord[] = []
    gearRatios: number[] = []
    width: number
    height: number
    partNumbers: number[] = []

    constructor(scheme: any[][]) {
        this.scheme = scheme
        this.width = scheme[0].length
        this.height = scheme.length
        this.initSymbols()
        this.initGears()
    }

    initSymbols = () => {
        this.scheme.map((row, y) => {
            row.map((character, x) => {
                if (isSymbol(character)) {
                    this.symbols.push(new Coord(x, y))
                }
            })
        })
    }

    initGears = () => {
        this.gears = this.symbols.filter((coord) => {
            return this.getValue(coord) === '*'
        })
    }

    checkNeighbors = (col: number, row: number) => {
        if (row > 0) {
            if (col > 0) {
                // check top left
                isNumeric(this.scheme[row - 1][col - 1]) ? this.numbers.push(new Coord(col - 1, row - 1)) : null
            }
            // check above
            isNumeric(this.scheme[row - 1][col]) ? this.numbers.push(new Coord(col, row - 1)) : null

            if (col < this.width - 1) {
                isNumeric(this.scheme[row - 1][col + 1]) ? this.numbers.push(new Coord(col + 1, row - 1)) : null
                // check top right
            }
        }

        if (col > 0) {
            // check left
            isNumeric(this.scheme[row][col - 1]) ? this.numbers.push(new Coord(col - 1, row)) : null
        }
        if (col < this.width - 1) {
            // check right
            isNumeric(this.scheme[row][col + 1]) ? this.numbers.push(new Coord(col + 1, row)) : null
        }

        if (row < this.height - 1) {
            if (col > 0) {
                // check bottom left
                isNumeric(this.scheme[row + 1][col - 1]) ? this.numbers.push(new Coord(col - 1, row + 1)) : null
            }
            isNumeric(this.scheme[row + 1][col]) ? this.numbers.push(new Coord(col, row + 1)) : null
            // check below
            if (col < this.width - 1) {
                // check bottom right
                isNumeric(this.scheme[row + 1][col + 1]) ? this.numbers.push(new Coord(col + 1, row + 1)) : null
            }
        }
    }

    findPartNumbers = () => {
        this.symbols.map((symbol) => {
            this.checkNeighbors(symbol.x, symbol.y)
        })
        this.numbers.sort((a, b) => {
            if (a.y === b.y) {
                return a.x < b.x ? -1 : 1
            }
            return a.y < b.y ? -1 : 1
        })

        this.numbers = this.numbers.filter((coord, index, original) => {
            if (index === 0) {
                return true
            }

            const last = original[index - 1]
            if (coord.y === last.y && Math.abs(coord.x - last.x) <= 1) {
                return false
            }
            return true
        })

        this.numbers.map((coord) => {
            this.partNumbers.push(parseInt(this.buildPartNumber(coord)))
        })
        return this.partNumbers
    }

    findGears = () => {
        this.gears.map((symbol) => {
            this.checkNeighbors(symbol.x, symbol.y)
            this.numbers.sort((a, b) => {
                if (a.y === b.y) {
                    return a.x < b.x ? -1 : 1
                }
                return a.y < b.y ? -1 : 1
            })
            this.numbers = this.numbers.filter((coord, index, original) => {
                if (index === 0) {
                    return true
                }

                const last = original[index - 1]
                if (coord.y === last.y && Math.abs(coord.x - last.x) <= 1) {
                    return false
                }
                return true
            })
            if (this.numbers.length === 2) {
                this.numbers.map((coord) => {
                    this.partNumbers.push(parseInt(this.buildPartNumber(coord)))
                })

                console.log(this.partNumbers)
                this.gearRatios.push(
                    parseInt(this.buildPartNumber(this.numbers[0])) * parseInt(this.buildPartNumber(this.numbers[1]))
                )
            }
            this.numbers = []
        })
    }

    buildPartNumber = (coord: Coord) => {
        let partNumber = this.scheme[coord.y][coord.x]
        // go to the left until you hit a non numeric
        let col = coord.x
        while (isNumeric(this.scheme[coord.y][col - 1])) {
            partNumber = this.scheme[coord.y][col - 1] + partNumber
            col--
        }
        // go to the right until you hit a non numeric
        col = coord.x
        while (isNumeric(this.scheme[coord.y][col + 1])) {
            partNumber = partNumber + this.scheme[coord.y][col + 1]
            col++
        }

        return partNumber
    }

    isSymbol(x: number, y: number) {
        return isSymbol(this.scheme[y][x])
    }

    getValue(coord: Coord) {
        return this.scheme[coord.y][coord.x]
    }
}
