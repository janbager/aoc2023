import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import extractGameId from './extractGameId'
import extractRounds from './extractRounds'
import { Dice, Game } from './Game'

export default () => {
    const data = loadData('src/day2/input.data')
    console.log('running day2 task2')

    const lines = splitLines(data)
    const games = lines.map((line) => {
        const gameData = line.split(': ')
        return new Game(extractGameId(gameData[0]), extractRounds(gameData[1]))
    })
    const sumOfGamePower: number = games.reduce(
        (sum, game) => sum + game.getPower(new Dice('red', 0), new Dice('green', 0), new Dice('blue', 0)),
        0
    )
    console.log(`The sum of all game power is ${sumOfGamePower}`)
    return games
}
