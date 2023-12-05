import { isSymbol } from './isSymbol'

describe('isSymbol()', () => {
    it('should return true for any non numeric char or "."', () => {
        expect(isSymbol('#')).toBeTruthy()
    })
    it('should return false for "."', () => {
        expect(isSymbol('.')).toBeFalsy()
    })
    it('should return false for any numeric', () => {
        expect(isSymbol('2')).toBeFalsy()
    })
})
