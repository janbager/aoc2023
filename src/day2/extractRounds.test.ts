import extractRounds from './extractRounds'
import { Dice, Round } from './Game'

describe('extractRounds()', () => {
    it('should return an array of one round with two dices', () => {
        expect(extractRounds('3 blue, 5 red')).toStrictEqual([new Round([new Dice('blue', 3), new Dice('red', 5)])])
    })
    it('should return an array of two round with two dices each', () => {
        expect(extractRounds('3 blue, 12 green; 3 blue, 5 red')).toStrictEqual([
            new Round([new Dice('blue', 3), new Dice('green', 12)]),
            new Round([new Dice('blue', 3), new Dice('red', 5)]),
        ])
    })
})
