interface CardInterface {
    id: number
    availableNumbers: number[]
    chosenNumbers: number[]
    winningNumbers: number[]
}

interface GameInterface {
    cards: CardInterface[]
}

export class Card implements CardInterface {
    availableNumbers: number[]
    chosenNumbers: number[]
    id: number
    winningNumbers: number[]

    constructor(id: number, availableNumbers: number[], chosenNumbers: number[]) {
        this.id = id
        this.availableNumbers = availableNumbers
        this.chosenNumbers = chosenNumbers
        this.winningNumbers = this.findWinningNumbers()
    }

    findWinningNumbers() {
        return this.availableNumbers.filter((x) => this.chosenNumbers.includes(x))
    }
}

export class Game implements GameInterface {
    cards: CardInterface[]

    constructor(cards: CardInterface[]) {
        this.cards = cards
    }
}
