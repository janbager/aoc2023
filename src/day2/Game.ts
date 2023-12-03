export interface DiceInterface {
    color: string
    value: number
    isImpossible: (color: string, value: number) => boolean
}

export interface RoundInterface {
    dices?: DiceInterface[]
    isImpossible: (color: string, value: number) => boolean
}

export interface GameInterface {
    id: number
    rounds?: RoundInterface[]
    isImpossible: (greenDice: Dice, redDice: Dice, blueDice: Dice) => boolean
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
}
