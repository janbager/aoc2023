export default (gameName: string) => {
    try {
        return parseInt(gameName.split(' ')[1], 10);
    } catch (e) {
        throw new Error('No valid game id found');
    }
}
