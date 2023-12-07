import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { Scheme } from './Scheme'

export const task1 = () => {
    console.log('running day3 task1')
    const data = loadData('src/day3/input.data')
    const scheme = splitLines(data).map((line) => [...line])
    const grid = new Scheme(scheme)
    grid.findPartNumbers()
    console.log(grid.partNumbers.reduce((acc, cur) => acc + cur, 0))
}
