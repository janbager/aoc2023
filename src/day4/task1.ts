import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import getCard from './getCard'

export const task1 = () => {
    const data = loadData('src/day4/test.data')
    console.log('running day4 task1')

    const lines = splitLines(data)
    console.log(`There are ${lines.length} lines`)

    const cards = lines.map((line) => getCard(line))
}
