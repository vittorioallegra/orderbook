import { Feed, Market } from '../../enums';

export interface IWebSocketRequestMessage {
    readonly event: string;
    readonly feed: Feed;
    readonly product_ids: Market[];
}

export type IOrderLevelUpdate = [price: number, size: number];
export interface IWebSocketResponseMessage {
    readonly asks: IOrderLevelUpdate[];
    readonly bids: IOrderLevelUpdate[];
    readonly feed: Feed;
    readonly numLevels: number;
    readonly product_id: Market;
}
