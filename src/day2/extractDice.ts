import { Dice } from './Game'

export default (diceData: string) => {
    const color = diceData.split(' ')[1]
    const value = parseInt(diceData.split(' ')[0], 10)
    return new Dice(color, value)
}
