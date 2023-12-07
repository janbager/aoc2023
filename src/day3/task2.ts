import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import { Scheme } from './Scheme'
import { Coord } from './Coord'

export const task2 = () => {
    console.log('running day3 task1')
    const data = loadData('src/day3/input.data')
    const scheme = splitLines(data).map((line) => [...line])
    const grid = new Scheme(scheme)
    grid.findGears()
    console.log(grid.gearRatios.reduce((acc, cur) => acc + cur, 0))
}
