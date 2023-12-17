import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'

export const task1 = () => {
    console.log('running day7 task1')
    const data = loadData('src/day8/test.data')
    const lines = splitLines(data)

    console.log(lines)
}
