export interface Element {
    name: string,
    path: string,
    x: number,
    y: number,
    width: number,
    height: number,
    rdm_x?: number,
    rdm_y?: number,
    opacity?: number
}

export interface Resource {
    music?: string,
    width: number,
    height: number,
    origin: string,
    elements: Element[]
}