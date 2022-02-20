import { IPageVisibility } from '../interfaces';

export const getPageVisibilityProps = (): IPageVisibility => {
    let name = '';
    let event = '';

    // @ts-ignore
    if (typeof document.msHidden !== 'undefined') {
        name = 'msHidden';
        event = 'msvisibilitychange';
        // @ts-ignore
    } else if (typeof document.webkitHidden !== 'undefined') {
        name = 'webkitHidden';
        event = 'webkitvisibilitychange';
    } else {
        name = 'hidden';
        event = 'visibilitychange';
    }

    return {
        name,
        event,
    };
};
