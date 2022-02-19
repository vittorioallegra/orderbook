import { Side } from '../enums';
import { IOrderBook, IOrderLevel, IUpdateOrderLevel, IWebSocketResponseMessage } from '../interfaces';

type IOrders = { [size: number]: IOrderLevel };
const parseUpdatesOrderLevels = (
    newOrderLevels: IUpdateOrderLevel[],
    currentOrderLevels: IOrderLevel[],
    side: Side,
): IOrderLevel[] => {
    const currentOrders = currentOrderLevels.reduce(
        (acc, it) => ({
            ...acc,
            [it.price]: {
                ...it,
                total: 0,
            },
        }),
        {} as IOrders,
    );

    const newOrders = newOrderLevels.reduce(
        (acc, [price, size]) => ({
            ...acc,
            [price]: {
                price,
                size,
                total: 0,
            },
        }),
        {} as IOrders,
    );

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

    const buy = parseUpdatesOrderLevels(message.bids, state.buy, Side.BUY);
    const sell = parseUpdatesOrderLevels(message.asks, state.sell, Side.SELL);
    const spread = (buy.length ? buy[0].price : 0) - (sell.length ? sell[0].price : 0);

    return {
        buy,
        sell,
        spread,
    };
};

export const OrderBookHelper = {
    parseWebSocketResponseMessage,
};
