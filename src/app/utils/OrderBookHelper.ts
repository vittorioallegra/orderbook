import { MAX_ORDER_LEVELS_DESKTOP, MAX_ORDER_LEVELS_MOBILE, MOBILE_BREAKPOINT } from '../config';
import { Side } from '../enums';
import { IOrderBook, IOrderLevel, IOrderLevelUpdate, IWebSocketResponseMessage } from '../interfaces';

type IOrders = { [size: number]: IOrderLevel };
export const parseUpdatesOrderLevels = (
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

export const parseWebSocketResponseMessage = (message: IWebSocketResponseMessage, state: IOrderBook): IOrderBook => {
    if (!message.bids || !message.asks) {
        return state;
    }

    const bids = parseUpdatesOrderLevels(message.bids, state.buy, Side.BUY);
    const asks = parseUpdatesOrderLevels(message.asks, state.sell, Side.SELL);

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const maxOrderLevels = isMobile ? MAX_ORDER_LEVELS_MOBILE : MAX_ORDER_LEVELS_DESKTOP;
    let length = 0;
    let spread = 0;
    let total = 0;

    if (bids.length && asks.length) {
        length = Math.min(bids.length, asks.length, maxOrderLevels);
        spread = bids[0].price - asks[0].price;
        total = Math.max(bids[length - 1].total, asks[length - 1].total);
    } else if (bids.length) {
        length = Math.min(bids.length, maxOrderLevels);
        spread = bids[0].price;
        total = bids[length - 1].total;
    } else if (asks.length) {
        length = Math.min(asks.length, maxOrderLevels);
        spread = -asks[0].price;
        total = asks[length - 1].total;
    }

    const mapOrderLevel = (it: IOrderLevel) => ({
        ...it,
        depth: it.total / total,
    });
    const buy = bids.map(mapOrderLevel);
    const sell = asks.map(mapOrderLevel);

    return {
        buy,
        sell,
        spread,
        length,
    };
};
