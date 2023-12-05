import { Scheme } from './Scheme'
import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'

describe('isNumeric()', () => {
    let scheme: Scheme
    beforeEach(() => {
        const data = loadData('src/day3/test.data')
        const grid = splitLines(data).map((line) => [...line])
        scheme = new Scheme(grid)
    })

    afterEach(() => {})

    it('should return an array of valid part numbers', () => {
        expect(scheme.findPartNumbers()).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
    })
})
