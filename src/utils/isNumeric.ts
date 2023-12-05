export const isNumeric = (v: any) => {
    return Number.isInteger(Number(v)) && v !== null
}
