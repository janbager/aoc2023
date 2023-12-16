import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'

export const task2 = () => {
    console.log('running day8 task2')
    const data = loadData('src/day8/test.data')
    const lines = splitLines(data)

    console.log(lines)
}
