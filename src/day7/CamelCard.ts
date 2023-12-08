import { Hand } from './Hand'

interface CamelCardInterface {
    hands: Hand[]
}

export class CamelCard implements CamelCardInterface {
    hands: Hand[] = []

    constructor(hands: Hand[]) {
        this.hands = hands
    }

    compareHands = (hand1: Hand, hand2: Hand) => {
        if (hand1.type === hand2.type) {
            return hand1.compareCards(hand2)
        }

        return hand1.type < hand2.type ? -1 : 1
    }

    play = () => {
        this.hands.sort((a, b) => this.compareHands(a, b))
        this.hands.map((hand, index) => (hand.rank = index + 1))
    }
}
