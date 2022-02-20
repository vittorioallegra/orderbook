import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageVisibility, useWebSocket } from '../../contexts';
import { Button, MarketTable, Modal } from '../../components';

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
                <h2 className="title">{t(`pages.home.title.${market}`)}</h2>
            </div>
            <MarketTable orderbook={orderbook} />
            <div className="home__actions">
                <Button label={t('pages.home.action')} onClick={toggleFeed} />
            </div>
        </div>
    );
};
