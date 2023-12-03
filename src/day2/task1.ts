import loadData from '../utils/loadData'
import splitLines from '../utils/splitLines'
import extractGameId from './extractGameId'
import extractRounds from './extractRounds'
import { Dice, Game } from './Game'

export default () => {
    const data = loadData('src/day2/input.data')
    console.log('running day2 task1')

    const lines = splitLines(data)
    const games = lines.map((line) => {
        const gameData = line.split(': ')
        return new Game(extractGameId(gameData[0]), extractRounds(gameData[1]))
    })
    const sumOfAllGameIds = games.reduce((sum, game) => sum + game.id, 0)
    console.log(`The sum of all game ids is ${sumOfAllGameIds}`)

    const possibleGames = games.filter((game) => {
        return !game.isImpossible(new Dice('red', 12), new Dice('green', 13), new Dice('blue', 14))
    })
    console.log(`There are ${possibleGames.length} possible games`)

    const sumOfPossibleGameIds = possibleGames.reduce((sum, game) => sum + game.id, 0)
    console.log(`The sum of all possible game ids is ${sumOfPossibleGameIds}`)
    return games
}
