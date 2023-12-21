export interface PointInterface {
    x: number
    y: number
    color: string
    value: string

    key(): string

    clone(): PointInterface
}

export interface VectorInterface {
    x: number
    y: number
}
