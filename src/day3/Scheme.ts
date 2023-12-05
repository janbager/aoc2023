import { isNumeric } from '../utils/isNumeric'
import { isSymbol } from './isSymbol'

export class Scheme {
    scheme: any[][]
    width: number
    height: number
    currentPartNumber: string[]
    processedIndex: number
    isPartNumber: boolean
    partNumbers: number[] = []

    constructor(scheme: any[][]) {
        this.scheme = scheme
        this.width = scheme[0].length
        this.height = scheme.length
        this.currentPartNumber = []
        this.processedIndex = 0
        this.isPartNumber = false
    }

    isSymbol(x: number, y: number) {
        return isSymbol(this.scheme[y][x])
    }

    checkNeighbours(x: number, y: number) {
        if (!isNumeric(this.scheme[y][x])) return false

        this.currentPartNumber.push(this.scheme[y][x])
        if (x < this.width - 1 && isNumeric(this.scheme[y][x + 1])) {
            const nextNumeric = this.checkNeighbours(x + 1, y)
            if (!nextNumeric && this.currentPartNumber.length > 0) {
                this.processedIndex = x + 1
            }
            console.log(`x: ${x}, y: ${y}, currentPartNumber: ${this.currentPartNumber}`)
        }

        this.checkRight(x, y)
        this.checkLeft(x, y)
        this.checkAbove(x, y)
        this.checkBelow(x, y)
        this.checkDiagonals(x, y)

        if (this.processedIndex > x && this.isPartNumber && this.currentPartNumber.length > 0) {
            this.partNumbers.push(parseInt(this.currentPartNumber.join('')))
            this.isPartNumber = false
            this.currentPartNumber = []
        }
    }

    checkRight(x: number, y: number) {
        if (x === this.width - 1) return false
        if (this.isSymbol(x + 1, y)) {
            this.isPartNumber = true
        }
    }

    checkDiagonals(x: number, y: number) {
        if (x > 0) {
            if (y > 0 && this.isSymbol(x - 1, y - 1)) {
                //                console.log('TL: ', x, y, this.scheme[y][x], this.scheme[y - 1][x - 1])
                this.isPartNumber = true
            }
            if (y < this.height - 1 && this.isSymbol(x - 1, y + 1)) {
                //                console.log('BL: ', x, y, this.scheme[y][x], this.scheme[y + 1][x - 1])
                this.isPartNumber = true
            }
        }
        if (x < this.width - 1) {
            if (y > 0 && this.isSymbol(x + 1, y - 1)) {
                this.isPartNumber = true
            }
            if (y < this.height - 1 && this.isSymbol(x + 1, y + 1)) {
                this.isPartNumber = true
            }
        }
    }

    checkLeft(x: number, y: number) {
        if (x === 0) return false
        if (this.isSymbol(x - 1, y)) {
            this.isPartNumber = true
        }
    }

    checkAbove(x: number, y: number) {
        if (y === 0) return false
        if (this.isSymbol(x, y - 1)) {
            this.isPartNumber = true
        }
    }

    checkBelow(x: number, y: number) {
        if (y === this.height - 1) return false
        if (this.isSymbol(x, y + 1)) {
            this.isPartNumber = true
        }
    }

    findPartNumbers() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (x < this.processedIndex) continue
                this.checkNeighbours(x, y)
                //this.extractNumbers(x, y)
            }
        }
        return this.partNumbers.filter((partNumber) => isNumeric(partNumber))
    }

    extractNumbers(x: number, y: number) {
        if (x < this.width - 1 && isNumeric(this.scheme[y][x + 1])) {
            console.log(`x: ${x}, y: ${y}, currentPartNumber: ${this.currentPartNumber}`)
            this.extractNumbers(x + 1, y)
        } else {
            this.processedIndex = x
            this.currentPartNumber.push(this.scheme[y][x])
        }
    }
}
