import { Feed, Market } from '../enums';
import { IOrderBook, IOrderLevel, IOrderLevelUpdate, IWebSocketResponseMessage } from '../interfaces';

export const mockOrderLevelUpdate: IOrderLevelUpdate[] = [
    [1, 1],
    [2, 1],
    [4, 2],
    [3, 1],
];

export const mockInitialOrderLevels: IOrderLevel[] = [
    {
        price: 6,
        size: 1,
        total: 1,
        depth: 0,
    },
    {
        price: 5,
        size: 1,
        total: 2,
        depth: 0,
    },
    {
        price: 4,
        size: 2,
        total: 4,
        depth: 0,
    },
    {
        price: 3,
        size: 1,
        total: 5,
        depth: 0,
    },
];

export const mockBuyOrderLevelsEmptyState: IOrderLevel[] = [
    {
        price: 4,
        size: 2,
        total: 2,
        depth: 0,
    },
    {
        price: 3,
        size: 1,
        total: 3,
        depth: 0,
    },
    {
        price: 2,
        size: 1,
        total: 4,
        depth: 0,
    },
    {
        price: 1,
        size: 1,
        total: 5,
        depth: 0,
    },
];

export const mockBuyOrderLevelsFilledState: IOrderLevel[] = [
    {
        price: 6,
        size: 1,
        total: 1,
        depth: 0,
    },
    {
        price: 5,
        size: 1,
        total: 2,
        depth: 0,
    },
    {
        price: 4,
        size: 2,
        total: 4,
        depth: 0,
    },
    {
        price: 3,
        size: 1,
        total: 5,
        depth: 0,
    },
    {
        price: 2,
        size: 1,
        total: 6,
        depth: 0,
    },
    {
        price: 1,
        size: 1,
        total: 7,
        depth: 0,
    },
];

export const mockSellOrderLevelsEmptyState: IOrderLevel[] = [
    {
        price: 1,
        size: 1,
        total: 1,
        depth: 0,
    },
    {
        price: 2,
        size: 1,
        total: 2,
        depth: 0,
    },
    {
        price: 3,
        size: 1,
        total: 3,
        depth: 0,
    },
    {
        price: 4,
        size: 2,
        total: 5,
        depth: 0,
    },
];

export const mockSellOrderLevelsFilledState: IOrderLevel[] = [
    {
        price: 1,
        size: 1,
        total: 1,
        depth: 0,
    },
    {
        price: 2,
        size: 1,
        total: 2,
        depth: 0,
    },
    {
        price: 3,
        size: 1,
        total: 3,
        depth: 0,
    },
    {
        price: 4,
        size: 2,
        total: 5,
        depth: 0,
    },
    {
        price: 5,
        size: 1,
        total: 6,
        depth: 0,
    },
    {
        price: 6,
        size: 1,
        total: 7,
        depth: 0,
    },
];

export const mockRemoveOrderLevelUpdate: IOrderLevelUpdate[] = [[4, 0]];

export const mockRemoveBuyOrderLevelsFilledState: IOrderLevel[] = [
    {
        price: 6,
        size: 1,
        total: 1,
        depth: 0,
    },
    {
        price: 5,
        size: 1,
        total: 2,
        depth: 0,
    },
    {
        price: 3,
        size: 1,
        total: 3,
        depth: 0,
    },
];

export const mockRemoveSellOrderLevelsFilledState: IOrderLevel[] = [
    {
        price: 3,
        size: 1,
        total: 1,
        depth: 0,
    },
    {
        price: 5,
        size: 1,
        total: 2,
        depth: 0,
    },
    {
        price: 6,
        size: 1,
        total: 3,
        depth: 0,
    },
];

export const mockInitialOrderBook: IOrderBook = {
    buy: mockInitialOrderLevels,
    sell: mockInitialOrderLevels,
    spread: 0,
    length: 0,
};

export const mockUpdateOrderBook: IOrderBook = {
    buy: [
        {
            price: 6,
            size: 1,
            total: 1,
            depth: 1 / 7,
        },
        {
            price: 5,
            size: 1,
            total: 2,
            depth: 2 / 7,
        },
        {
            price: 4,
            size: 2,
            total: 4,
            depth: 4 / 7,
        },
        {
            price: 3,
            size: 1,
            total: 5,
            depth: 5 / 7,
        },
        {
            price: 2,
            size: 1,
            total: 6,
            depth: 6 / 7,
        },
        {
            price: 1,
            size: 1,
            total: 7,
            depth: 1,
        },
    ],
    sell: [
        {
            price: 1,
            size: 1,
            total: 1,
            depth: 1 / 7,
        },
        {
            price: 2,
            size: 1,
            total: 2,
            depth: 2 / 7,
        },
        {
            price: 3,
            size: 1,
            total: 3,
            depth: 3 / 7,
        },
        {
            price: 4,
            size: 2,
            total: 5,
            depth: 5 / 7,
        },
        {
            price: 5,
            size: 1,
            total: 6,
            depth: 6 / 7,
        },
        {
            price: 6,
            size: 1,
            total: 7,
            depth: 1,
        },
    ],
    spread: 5,
    length: 6,
};

export const mockRemoveOrderBook: IOrderBook = {
    buy: [
        {
            price: 6,
            size: 1,
            total: 1,
            depth: 1 / 3,
        },
        {
            price: 5,
            size: 1,
            total: 2,
            depth: 2 / 3,
        },
        {
            price: 3,
            size: 1,
            total: 3,
            depth: 1,
        },
    ],
    sell: [
        {
            price: 3,
            size: 1,
            total: 1,
            depth: 1 / 3,
        },
        {
            price: 5,
            size: 1,
            total: 2,
            depth: 2 / 3,
        },
        {
            price: 6,
            size: 1,
            total: 3,
            depth: 1,
        },
    ],
    spread: 3,
    length: 3,
};

export const mockInvalidWebSocketMessage = {} as IWebSocketResponseMessage;

export const mockUpdateWebSocketMessage: IWebSocketResponseMessage = {
    asks: mockOrderLevelUpdate,
    bids: mockOrderLevelUpdate,
    feed: Feed.DELTA,
    numLevels: 0,
    product_id: Market.BITCON,
};

export const mockRemoveWebSocketMessage: IWebSocketResponseMessage = {
    asks: mockRemoveOrderLevelUpdate,
    bids: mockRemoveOrderLevelUpdate,
    feed: Feed.DELTA,
    numLevels: 0,
    product_id: Market.BITCON,
};
