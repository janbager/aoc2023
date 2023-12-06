import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import getCard from './getCard'
import { Game } from './Game'
import { CardInterface } from './Card'

export const task2 = () => {
    const data = loadData('src/day4/input.data')
    console.log('running day4 task2')

    const lines = splitLines(data)
    console.log(`There are ${lines.length} lines`)

    const cards = lines.map((line) => getCard(line))
    console.log(`There are ${cards.length} cards`)
    const game = new Game(cards)
    console.log(`Total points: ${game.getPoints()}`)

    const cardStack = game.cards
    let copies = game.getCopies(game.cards)
    let i = cardStack.length
    while (copies.length > 0) {
        //        cardStack.push(...copies)
        i += copies.length
        copies = game.getCopies(copies)
    }
    console.log(`Total cards in deck: ${i}`)
}
