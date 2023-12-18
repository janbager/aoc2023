import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'

export const task2 = () => {
    console.log('running day17 task2')
    const data = loadData('src/day17/input.data')
    const lines = splitLines(data)
    console.log(lines)
}
