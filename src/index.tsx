import React from 'react';
import ReactDOM from 'react-dom';
import { i18n } from './app/config';
import App from './app/container/App';

ReactDOM.render(
    <React.StrictMode>
        <App i18n={i18n} />
    </React.StrictMode>,
    document.getElementById('root'),
);
