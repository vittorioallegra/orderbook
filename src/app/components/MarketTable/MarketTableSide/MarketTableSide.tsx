import React from 'react';
import { useTranslation } from 'react-i18next';
import { Side } from '../../../enums';
import { IOrderLevel } from '../../../interfaces';
import { formatNumber, formatPrice } from '../../../utils';

interface IProps {
    orderLevels: IOrderLevel[];
    length: number;
    side: Side;
}

export const MarketTableSide: React.FC<IProps> = (props) => {
    const { t } = useTranslation();

    return (
        <div className={`market-table__side market-table__side--${props.side}`}>
            <div className="market-table__side__head">
                <span>{t('components.marketTable.price')}</span>
                <span>{t('components.marketTable.size')}</span>
                <span>{t('components.marketTable.total')}</span>
            </div>
            <div className="market-table__side__body">
                {props.orderLevels.slice(0, props.length).map((it, idx) => (
                    <div key={idx} className="order-level">
                        <div className="order-level--depth" style={{ width: `${it.depth * 100}%` }} />
                        <div className="order-level__infos">
                            <span className="order-level__infos--price">{formatPrice(it.price)}</span>
                            <span className="order-level__infos--size">{formatNumber(it.size)}</span>
                            <span className="order-level__infos--total">{formatNumber(it.total)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
