import { Race } from './Race'
import { Competition } from './Competition'

export const task2 = () => {
    console.log('running day6 task2')

    const testRaces = [new Race(71530, 940200)]
    const testcCompetition = new Competition(testRaces)
    console.log(`Total points in test: ${testcCompetition.getPoints()}`)

    const races = [new Race(34908986, 204171312101780)]
    const competition = new Competition(races)
    console.log(`Total points: ${competition.getPoints()}`)
}
