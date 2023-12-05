import extractCardId from './extractCardId'
import { Card } from './Game'
import { isNumeric } from '../utils/isNumeric'

export default (cardData: string) => {
    const cardName = cardData.split(': ')[0]
    const cardValues = cardData.split(': ')[1]
    const chosenNumbers = cardValues
        .split(' | ')[0]
        .replace('   ', ' ')
        .replace('  ', ' ')
        .split(' ')
        .map((value) => parseInt(value, 10))
        .filter((value) => isNumeric(value))
    const availableNumbers = cardValues
        .split(' | ')[1]
        .replace('   ', ' ')
        .replace('  ', ' ')
        .split(' ')
        .map((value) => parseInt(value, 10))
        .filter((value) => isNumeric(value))

    return new Card(extractCardId(cardName), availableNumbers, chosenNumbers)
}
