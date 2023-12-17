interface NodeInterface {
    left?: Node
    right?: Node
    value: string
}

export class Node implements NodeInterface {
    left?: Node
    right?: Node
    value: string

    constructor(value: string) {
        this.value = value
    }
}
