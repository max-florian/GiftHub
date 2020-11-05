export interface Card {
    id: string,
    name: string,
    image: string,
    chargeRate: number,
    active: boolean,
    availability: Array<number>,
    value?: number,
}