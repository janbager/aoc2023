import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import getCard from './getCard'
import { Game } from './Game'

export const task2 = () => {
    const data = loadData('src/day4/test.data')
    console.log('running day4 task2')

    const lines = splitLines(data)
    console.log(`There are ${lines.length} lines`)

    const cards = lines.map((line) => getCard(line))
    console.log(`There are ${cards.length} cards`)
    const game = new Game(cards)
    console.log(`Total points: ${game.getPoints()}`)

    console.log(`Total copies: ${game.getCopies()}`)
}
