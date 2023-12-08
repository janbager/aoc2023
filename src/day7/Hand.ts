interface HandInterface {
    cards: string
    bid: number
    rank: number
    type: number
    alphabet: string[]
}

export enum HandTypes {
    five_of_a_kind = 7,
    four_of_a_kind = 6,
    full_house = 5,
    three_of_a_kind = 4,
    two_pair = 3,
    one_pair = 2,
    high_card = 1,
}

export class Hand implements HandInterface {
    cards: string
    bid: number
    rank: number = 0
    type: number = 0
    alphabet: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
    counter: number[]

    constructor(cards: string, bid: number) {
        this.cards = cards
        this.bid = bid
        this.counter = this.alphabet.map(() => 0)
        this.countCards()
        this.setType()
    }

    countCards = () => {
        this.cards.split('').map((card) => {
            this.counter[this.alphabet.indexOf(card)]++
        })
    }
    setType = () => {
        const pattern = this.counter
            .filter((count) => count > 0)
            .sort((a, b) => (a < b ? 1 : -1))
            .join('_')

        switch (pattern) {
            case '5':
                this.type = HandTypes.five_of_a_kind
                break
            case '4_1':
                this.type = HandTypes.four_of_a_kind
                break
            case '3_2':
                this.type = HandTypes.full_house
                break
            case '3_1_1':
                this.type = HandTypes.three_of_a_kind
                break
            case '2_2_1':
                this.type = HandTypes.two_pair
                break
            case '2_1_1_1':
                this.type = HandTypes.one_pair
                break
            case '1_1_1_1_1':
            default:
                this.type = HandTypes.high_card
                break
        }
    }

    compareCards = (hand: Hand) => {
        const compared = this.cards
            .split('')
            .map((card, index) => {
                const cardIndex = this.alphabet.indexOf(card)
                const compareIndex = this.alphabet.indexOf(hand.cards[index])
                if (cardIndex === compareIndex) {
                    return 0
                }
                return card < hand.cards[index] ? 1 : -1
            })
            .filter((value) => value !== 0)

        if (compared.length === 0) {
            console.log('identical hands')
            return 0
        }
        return compared[0]
    }
}
