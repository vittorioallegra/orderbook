import { Side } from '../enums';
import {
    mockOrderLevelUpdate,
    mockInitialOrderLevels,
    mockBuyOrderLevelsEmptyState,
    mockBuyOrderLevelsFilledState,
    mockSellOrderLevelsEmptyState,
    mockSellOrderLevelsFilledState,
    mockRemoveBuyOrderLevelsFilledState,
    mockRemoveOrderLevelUpdate,
    mockRemoveSellOrderLevelsFilledState,
    mockInitialOrderBook,
    mockInvalidWebSocketMessage,
    mockUpdateWebSocketMessage,
    mockUpdateOrderBook,
    mockRemoveWebSocketMessage,
    mockRemoveOrderBook,
} from '../mocks';
import { parseUpdatesOrderLevels, parseWebSocketResponseMessage } from './OrderBookHelper';

describe('OrderBookHelper', () => {
    it('test update buy orderbook empty state', () => {
        expect(parseUpdatesOrderLevels(mockOrderLevelUpdate, [], Side.BUY)).toEqual(mockBuyOrderLevelsEmptyState);
    });

    it('test update buy orderbook filled state', () => {
        expect(parseUpdatesOrderLevels(mockOrderLevelUpdate, mockInitialOrderLevels, Side.BUY)).toEqual(
            mockBuyOrderLevelsFilledState,
        );
    });

    it('test update sell orderbook empty state', () => {
        expect(parseUpdatesOrderLevels(mockOrderLevelUpdate, [], Side.SELL)).toEqual(mockSellOrderLevelsEmptyState);
    });

    it('test update sell orderbook filled state', () => {
        expect(parseUpdatesOrderLevels(mockOrderLevelUpdate, mockInitialOrderLevels, Side.SELL)).toEqual(
            mockSellOrderLevelsFilledState,
        );
    });

    it('test remove buy orderbook filled state', () => {
        expect(parseUpdatesOrderLevels(mockRemoveOrderLevelUpdate, mockInitialOrderLevels, Side.BUY)).toEqual(
            mockRemoveBuyOrderLevelsFilledState,
        );
    });

    it('test remove sell orderbook filled state', () => {
        expect(parseUpdatesOrderLevels(mockRemoveOrderLevelUpdate, mockInitialOrderLevels, Side.SELL)).toEqual(
            mockRemoveSellOrderLevelsFilledState,
        );
    });

    it('test invalid websocket message', () => {
        expect(parseWebSocketResponseMessage(mockInvalidWebSocketMessage, mockInitialOrderBook)).toEqual(
            mockInitialOrderBook,
        );
    });

    it('test websocket update message', () => {
        expect(parseWebSocketResponseMessage(mockUpdateWebSocketMessage, mockInitialOrderBook)).toEqual(
            mockUpdateOrderBook,
        );
    });

    it('test websocket remove message', () => {
        expect(parseWebSocketResponseMessage(mockRemoveWebSocketMessage, mockInitialOrderBook)).toEqual(
            mockRemoveOrderBook,
        );
    });
});
