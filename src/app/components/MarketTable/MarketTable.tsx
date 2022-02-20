import React from 'react';
import { useTranslation } from 'react-i18next';
import { Side } from '../../enums';
import { IOrderLevel } from '../../interfaces';
import { formatNumber, formatPrice } from '../../utils';

interface IProps {
    orderLevels: IOrderLevel[];
    length: number;
    side: Side;
}

export const MarketTable: React.FC<IProps> = (props) => {
    const { t } = useTranslation();

    return (
        <div className={`market-table market-table--${props.side}`}>
            <div className="market-table__header">
                <div className="market-table__header__infos">
                    <span>{t('components.marketTable.price')}</span>
                    <span>{t('components.marketTable.size')}</span>
                    <span>{t('components.marketTable.total')}</span>
                </div>
            </div>
            {props.orderLevels.slice(0, props.length).map((it, idx) => (
                <div key={idx} className="market-table__level">
                    <div className="market-table__level--depth" style={{ width: `${it.depth * 100}%` }} />
                    <div className="market-table__level__infos">
                        <span className="market-table__level--price">{formatPrice(it.price)}</span>
                        <span className="market-table__level--size">{formatNumber(it.size)}</span>
                        <span className="market-table__level--total">{formatNumber(it.total)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
