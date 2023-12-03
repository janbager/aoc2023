export interface DiceInterface {
    color: string
    value: number
    isImpossible: (color: string, value: number) => boolean
}

export interface RoundInterface {
    dices?: DiceInterface[]
    isImpossible: (color: string, value: number) => boolean
    getPower: (color: string) => number
}

export interface GameInterface {
    id: number
    rounds?: RoundInterface[]
    isImpossible: (greenDice: Dice, redDice: Dice, blueDice: Dice) => boolean
    getPower: (greenDice: Dice, redDice: Dice, blueDice: Dice) => number
}

export class Dice implements DiceInterface {
    color: string
    value: number

    constructor(color: string, value: number) {
        this.color = color
        this.value = value
    }

    isImpossible(color: string, value: number) {
        return this.color === color && this.value > value
    }
}

export class Round implements RoundInterface {
    dices?: DiceInterface[]

    constructor(dices: DiceInterface[]) {
        this.dices = dices || ([] as DiceInterface[])
    }

    isImpossible(color: string, value: number): boolean {
        if (!this.dices) return true

        return this.dices.reduce((acc, dice) => acc || dice.isImpossible(color, value), false)
    }

    getPower(color: string): number {
        if (!this.dices) return 0

        return this.dices.reduce((acc, dice) => (dice.color === color && dice.value > acc ? dice.value : acc), 0)
    }
}

export class Game implements GameInterface {
    id: number
    rounds: RoundInterface[]

    constructor(id: number, rounds?: RoundInterface[]) {
        this.id = id
        this.rounds = rounds || ([] as RoundInterface[])
    }

    isImpossible(greenDice: Dice, redDice: Dice, blueDice: Dice): boolean {
        return this.rounds.reduce(
            (acc, round) =>
                acc ||
                round.isImpossible(greenDice.color, greenDice.value) ||
                round.isImpossible(redDice.color, redDice.value) ||
                round.isImpossible(blueDice.color, blueDice.value),
            false
        )
    }

    getPower(greenDice: Dice, redDice: Dice, blueDice: Dice): number {
        const greenPower = this.rounds.reduce(
            (acc, round) => (round.getPower(greenDice.color) > acc ? round.getPower(greenDice.color) : acc),
            0
        )
        const redPower = this.rounds.reduce(
            (acc, round) => (round.getPower(redDice.color) > acc ? round.getPower(redDice.color) : acc),
            0
        )
        const bluePower = this.rounds.reduce(
            (acc, round) => (round.getPower(blueDice.color) > acc ? round.getPower(blueDice.color) : acc),
            0
        )

        return (greenPower === 0 ? 1 : greenPower) * (redPower === 0 ? 1 : redPower) * (bluePower === 0 ? 1 : bluePower)
    }
}
