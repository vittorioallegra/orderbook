export interface IOrderLevel {
    price: number;
    size: number;
    total: number;
}

export interface IOrderBook {
    buy: IOrderLevel[];
    sell: IOrderLevel[];
    spread: number;
}
