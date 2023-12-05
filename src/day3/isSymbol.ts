import { isNumeric } from '../utils/isNumeric'

export const isSymbol = (character: string): boolean => !isNumeric(character) && character !== '.'
