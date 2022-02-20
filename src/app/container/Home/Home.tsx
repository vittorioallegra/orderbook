import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWebSocket } from '../../contexts';
import { Button, MarketTable } from '../../components';
import { Side } from '../../enums';
import { formatSpread } from '../../utils';

export const Home: React.FC = () => {
    const { t } = useTranslation();
    const { market, orderbook, connect, toggleFeed } = useWebSocket();

    React.useEffect(() => {
        connect();
    }, []);

    return (
        <div className="home">
            <div className="home__header">
                <div>{t(`pages.home.title.${market}`)}</div>
                <span>{t('pages.home.spread', { value: formatSpread(orderbook.spread) })}</span>
            </div>
            <div className="home__table">
                <MarketTable orderLevels={orderbook.buy} length={orderbook.length} side={Side.BUY} />
                <MarketTable orderLevels={orderbook.sell} length={orderbook.length} side={Side.SELL} />
            </div>
            <div className="home__actions">
                <Button label={t('pages.home.action')} onClick={toggleFeed} />
            </div>
        </div>
    );
};
