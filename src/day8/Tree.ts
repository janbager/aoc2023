interface TreeInterface {
    root?: Node
}

export class Tree implements TreeInterface {
    root?: Node

    constructor(root?: Node) {
        this.root = root
    }
}
