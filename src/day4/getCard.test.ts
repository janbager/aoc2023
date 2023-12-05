import getCard from './getCard'

describe('getCard()', () => {
    it('return a card', () => {
        expect(getCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toEqual({
            id: 1,
            availableNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
            chosenNumbers: [41, 48, 83, 86, 17],
            winningNumbers: [83, 86, 17, 48],
        })
    })
})
