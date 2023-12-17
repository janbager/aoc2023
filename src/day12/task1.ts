import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'

export const task1 = () => {
    console.log('running day12 task1')
    const data = loadData('src/day12/test.data')
    const lines = splitLines(data)

    const rawData = lines.map((line) => {
        const [springs, groups] = line.split(' ')
        return { springs, groups: groups.split(',') }
    })
    console.log(rawData)
}
