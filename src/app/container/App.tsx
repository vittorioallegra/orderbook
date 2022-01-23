import React from 'react';
import { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Home } from './Home';

interface IProps {
    i18n: i18n;
}

const App: React.FC<IProps> = (props) => (
    <I18nextProvider i18n={props.i18n}>
        <Home />
    </I18nextProvider>
);

export default App;
