import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { Hand } from './Hand'
import { CamelCard } from './CamelCard'

export const task2 = () => {
    console.log('running day7 task2')
    const data = loadData('src/day7/test.data')
    const lines = splitLines(data)
    const hands = lines.map((line) => {
        const rawHand = line.split(' ')
        return new Hand(rawHand[0], parseInt(rawHand[1]), true)
    })
    const game = new CamelCard(hands)
    game.play()

    game.hands.map((hand) => console.log(hand.cards, hand.bid, hand.rank, hand.type))
    console.log(game.hands.reduce((acc, cur) => acc + cur.bid * cur.rank, 0))
}
