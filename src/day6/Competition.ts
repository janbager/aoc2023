import { RaceInterface } from './Race'

export interface CompetitionInterface {
    races: RaceInterface[]
}

export class Competition implements CompetitionInterface {
    races: RaceInterface[]

    constructor(races: RaceInterface[]) {
        this.races = races
    }

    getPoints() {
        let points = 1
        this.races.map((race) => {
            points *= race.getWinningRaces().length
        })
        return points
    }
}
