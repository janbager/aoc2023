interface CardInterface {
    id: number
    availableNumbers: number[]
    chosenNumbers: number[]
    winningNumbers: number[]
    getPoints: () => number
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

    getPoints() {
        if (this.winningNumbers.length === 0) return 0
        return Math.pow(2, this.winningNumbers.length - 1)
    }
}

export class Game implements GameInterface {
    cards: CardInterface[]

    constructor(cards: CardInterface[]) {
        this.cards = cards
    }

    getPoints() {
        return this.cards.reduce((acc, card) => acc + card.getPoints(), 0)
    }
}
