import { isNumeric } from './isNumeric'

describe('isNumeric()', () => {
    it('return true for integer value', () => {
        expect(isNumeric(3)).toBeTruthy()
    })
    it('return true for numeric string value', () => {
        expect(isNumeric('23')).toBeTruthy()
    })
    it('return false for non numeric string value', () => {
        expect(isNumeric('Test')).toBeFalsy()
    })
})
