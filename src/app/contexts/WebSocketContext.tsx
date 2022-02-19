import React from 'react';
import { Feed, Market } from '../enums';
import { IOrderBook, IWebSocketRequestMessage, IWebSocketResponseMessage } from '../interfaces';
import { createUseFunction, OrderBookHelper } from '../utils';

// properties that provides this context
interface IWebSocketContext {
    market: Market;
    orderbook: IOrderBook;
    connect: () => void;
    toggleFeed: () => void;
    close: () => void;
}

const initialState: IOrderBook = {
    buy: [],
    sell: [],
    spread: 0,
};

function websocketReducer(orderbook: IOrderBook, message: IWebSocketResponseMessage | undefined): IOrderBook {
    if (message) {
        return OrderBookHelper.parseWebSocketResponseMessage(message, orderbook);
    } else {
        return initialState;
    }
}

const WebSocketContext = React.createContext<null | IWebSocketContext>(null);
WebSocketContext.displayName = 'WebSocket Context';

export const WebSocketProvider: React.FC = ({ children }) => {
    const [websocket, setWebSocket] = React.useState<WebSocket | undefined>(undefined);
    const [market, setMarket] = React.useState(Market.BITCON);
    const [orderbook, dispatch] = React.useReducer(websocketReducer, initialState);

    const getSubscribeMessage = (product: Market): IWebSocketRequestMessage => ({
        event: 'subscribe',
        feed: Feed.DELTA,
        product_ids: [product],
    });

    const getUnsubscribeMessage = (product: Market): IWebSocketRequestMessage => ({
        event: 'unsubscribe',
        feed: Feed.DELTA,
        product_ids: [product],
    });

    const connect = (product = market) => {
        console.log('Subscribing to ', product);

        const socket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
        socket.onopen = () => {
            socket.send(JSON.stringify(getSubscribeMessage(product)));
        };
        socket.onmessage = (event) => {
            const message: IWebSocketResponseMessage = JSON.parse(event.data);
            dispatch(message);
        };
        setWebSocket(socket);
    };

    const toggleFeed = () => {
        console.log('Unsubscribing from ', market);

        const product = market === Market.BITCON ? Market.ETHEREUM : Market.BITCON;
        websocket?.send(JSON.stringify(getUnsubscribeMessage(market)));
        setMarket(product);
        dispatch(undefined);
        connect(product);
    };

    const close = () => {
        websocket?.close();
    };

    return (
        <WebSocketContext.Provider
            value={{
                market,
                orderbook,
                connect,
                toggleFeed,
                close,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = createUseFunction<IWebSocketContext>(WebSocketContext);
