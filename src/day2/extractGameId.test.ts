import extractGameId from "./extractGameId";
describe('extractGameId()', () => {
    it('return a numeric game id', () => {
        expect(extractGameId('Game 123')).toBe(123)
    })
    it('no valid id found', () => {
        expect(extractGameId('Game no ID')).toBeNaN();
    })
})
