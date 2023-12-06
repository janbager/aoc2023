export interface RaceInterface {
    time: number
    distance: number
    getWinningRaces: () => number[]
}

export class Race implements RaceInterface {
    time: number
    distance: number

    constructor(time: number, distance: number) {
        this.time = time
        this.distance = distance
    }

    getLoadingTimes() {
        const loadingTimes = []
        for (let i = 0; i <= this.time; i++) {
            loadingTimes.push(i)
        }
        return loadingTimes
    }

    getFloatingDistances() {
        return this.getLoadingTimes().map((loadingTime) => {
            return (this.time - loadingTime) * loadingTime
        })
    }

    getWinningRaces() {
        return this.getFloatingDistances().filter((floatingDistance) => {
            return floatingDistance > this.distance
        })
    }
}
