import { Race } from './Race'
import { Competition } from './Competition'

export const task1 = () => {
    console.log('running day6 task1')

    const testRaces = [new Race(7, 9), new Race(15, 40), new Race(30, 200)]
    const testcCompetition = new Competition(testRaces)
    console.log(`Total points in test: ${testcCompetition.getPoints()}`)

    const races = [new Race(34, 204), new Race(90, 1713), new Race(89, 1210), new Race(86, 1780)]
    const competition = new Competition(races)
    console.log(`Total points: ${competition.getPoints()}`)
}
