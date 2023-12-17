interface AnalyzerInterface {
    springs: string
    groups: number[]
}

export class Analyzer implements AnalyzerInterface {
    springs: string
    groups: number[]

    constructor(springs: string, groups: number[]) {
        this.springs = springs
        this.groups = groups
    }

    public analyze(): number {
        return 0
    }
}
