export default (cardName: string) => {
    try {
        return parseInt(cardName.replace('   ', ' ').replace('  ', ' ').split(' ')[1], 10)
    } catch (e) {
        throw new Error('No valid card id found')
    }
}
