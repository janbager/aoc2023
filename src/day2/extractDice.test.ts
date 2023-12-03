import extractDice from './extractDice'
import { Dice } from './Game'

describe('extractDice()', () => {
    it('should return a dice object', () => {
        expect(extractDice('3 blue')).toStrictEqual(new Dice('blue', 3))
    })
})
