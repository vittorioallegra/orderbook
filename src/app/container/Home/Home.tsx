import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageVisibility, useWebSocket } from '../../contexts';
import { Button, MarketTable, Modal } from '../../components';
import { Side } from '../../enums';
import { formatSpread } from '../../utils';

export const Home: React.FC = () => {
    const { t } = useTranslation();
    const { isPageHidden } = usePageVisibility();
    const { market, orderbook, connect, toggleFeed, disconnect } = useWebSocket();
    const [isModalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        connect();
    }, []);

    React.useEffect(() => {
        if (isPageHidden) {
            disconnect();
            setModalVisible(true);
        }
    }, [isPageHidden]);

    const handleReconnect = () => {
        setModalVisible(false);
        connect();
    };

    return (
        <div className="home">
            {isModalVisible && (
                <Modal
                    description={t('pages.home.modal.description')}
                    button={t('pages.home.modal.button')}
                    onClick={handleReconnect}
                />
            )}
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
