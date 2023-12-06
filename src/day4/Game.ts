import { CardInterface } from './Card'

interface GameInterface {
    cards: CardInterface[]
    copies?: CardInterface[]
    findCardById: (id: number) => CardInterface | undefined
}

export class Game implements GameInterface {
    cards: CardInterface[]
    copies: CardInterface[] = [] as CardInterface[]

    constructor(cards: CardInterface[]) {
        this.cards = cards
    }

    getPoints() {
        return this.cards.reduce((acc, card) => acc + card.getPoints(), 0)
    }

    getCopies(stack: CardInterface[]) {
        const myCopies = [] as CardInterface[]
        stack.map((card) => {
            card.getWinningNumbers().map((number, index) => {
                const copy = this.findCardById(card.id + index + 1)
                if (copy) {
                    myCopies.push(copy)
                }
            })
        })

        return [...myCopies.flat()]
    }

    findCardById(id: number): CardInterface | undefined {
        return this.cards.find((card) => card.id === id)
    }
}
