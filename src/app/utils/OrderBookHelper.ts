import { MAX_ORDER_LEVELS_DESKTOP, MAX_ORDER_LEVELS_MOBILE } from '../config';
import { Side } from '../enums';
import { IOrderBook, IOrderLevel, IOrderLevelUpdate, IWebSocketResponseMessage } from '../interfaces';

type IOrders = { [size: number]: IOrderLevel };
const parseUpdatesOrderLevels = (
    newOrderLevels: IOrderLevelUpdate[],
    currentOrderLevels: IOrderLevel[],
    side: Side,
): IOrderLevel[] => {
    // 1. Map current orders to json object with price as key, so that it will be easy to overwrite it's status with delta
    const currentOrders = currentOrderLevels.reduce(
        (acc, it) => ({
            ...acc,
            [it.price]: {
                ...it,
                total: 0,
                depth: 0,
            },
        }),
        {} as IOrders,
    );

    // 2. Map order updates to json obejct same as current orders
    const newOrders = newOrderLevels.reduce(
        (acc, [price, size]) => ({
            ...acc,
            [price]: {
                price,
                size,
                total: 0,
                depth: 0,
            },
        }),
        {} as IOrders,
    );

    // 3. Combine (and overwrite current oders), filter out zero size order levels and sort based on side
    const orders = Object.values({
        ...currentOrders,
        ...newOrders,
    })
        .filter((it) => it.size !== 0)
        .sort((a, b) => ((side === Side.BUY ? a.price > b.price : a.price < b.price) ? -1 : 1));

    return orders.map((it, idx) => ({
        ...it,
        total: orders.slice(0, idx + 1).reduce((acc, { size }) => acc + size, 0),
    }));
};

const parseWebSocketResponseMessage = (message: IWebSocketResponseMessage, state: IOrderBook): IOrderBook => {
    if (!message.bids || !message.asks) {
        return state;
    }

    const bids = parseUpdatesOrderLevels(message.bids, state.buy, Side.BUY);
    const asks = parseUpdatesOrderLevels(message.asks, state.sell, Side.SELL);
    if (!bids.length || !asks.length) {
        return state;
    }

    const isMobile = window.innerWidth <= 720;
    const maxOrderLevels = isMobile ? MAX_ORDER_LEVELS_MOBILE : MAX_ORDER_LEVELS_DESKTOP;
    const length = Math.min(bids.length, asks.length, maxOrderLevels);
    const spread = bids[0].price - asks[0].price;
    const total = Math.max(bids[length - 1].total, asks[length - 1].total);

    const buy = bids.map((it) => ({
        ...it,
        depth: it.total / total,
    }));
    const sell = asks.map((it) => ({
        ...it,
        depth: it.total / total,
    }));

    return {
        buy,
        sell,
        spread,
        length,
    };
};

export const OrderBookHelper = {
    parseWebSocketResponseMessage,
};
