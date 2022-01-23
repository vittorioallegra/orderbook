import { default as i18next } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '../messages';

const instance = i18next.use(initReactI18next).createInstance({
    defaultNS: 'app',
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en'],
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    ns: ['app'],
    resources: {
        en,
    },
});

instance.init();

export const i18n = instance;
