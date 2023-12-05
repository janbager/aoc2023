import extractCardId from './extractCardId'

describe('extractCardId()', () => {
    it('return a numeric game id', () => {
        expect(extractCardId('Card 123')).toBe(123)
    })
    it('no valid id found', () => {
        expect(extractCardId('Card no ID')).toBeNaN()
    })
})
