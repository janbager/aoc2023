export default (data: string): string[] => {
    return data.split('\n').filter((line) => line.length > 0)
}
