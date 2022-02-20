import React from 'react';
import { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { PageVisibilityProvider, WebSocketProvider } from '../contexts';
import { Home } from './Home';

interface IProps {
    i18n: i18n;
}

const App: React.FC<IProps> = (props) => (
    <I18nextProvider i18n={props.i18n}>
        <WebSocketProvider>
            <PageVisibilityProvider>
                <Home />
            </PageVisibilityProvider>
        </WebSocketProvider>
    </I18nextProvider>
);

export default App;
