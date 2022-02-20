import React from 'react';
import { useTranslation } from 'react-i18next';
import { Side } from '../../enums';
import { IOrderBook } from '../../interfaces';
import { formatSpread } from '../../utils';
import { MarketTableSide } from './MarketTableSide';

interface IProps {
    orderbook: IOrderBook;
}

export const MarketTable: React.FC<IProps> = (props) => {
    const { t } = useTranslation();

    const getSpread = (device: string) => (
        <div className={`market-table__spread market-table__spread--${device}`}>
            <p>{t('components.marketTable.spread', { value: formatSpread(props.orderbook.spread) })}</p>
        </div>
    );

    return (
        <div className="market-table">
            {getSpread('desktop')}
            <div className="market-table__content">
                <MarketTableSide orderLevels={props.orderbook.buy} length={props.orderbook.length} side={Side.BUY} />
                {getSpread('mobile')}
                <MarketTableSide orderLevels={props.orderbook.sell} length={props.orderbook.length} side={Side.SELL} />
            </div>
        </div>
    );
};
