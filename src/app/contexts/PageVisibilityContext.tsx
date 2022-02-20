import React from 'react';
import { createUseFunction, getPageVisibilityProps } from '../utils';

// properties that provides this context
interface IPageVisibilityContext {
    isPageHidden: boolean;
}

const PageVisibilityContext = React.createContext<null | IPageVisibilityContext>(null);
PageVisibilityContext.displayName = 'PageVisibility Context';

export const PageVisibilityProvider: React.FC = ({ children }) => {
    const [pageVisibilityProps] = React.useState(getPageVisibilityProps());
    const [isHidden, setHidden] = React.useState(false);

    const handleVisibilityChange = () => {
        setHidden(document[pageVisibilityProps.name as keyof Document] as boolean);
    };

    React.useEffect(() => {
        document.addEventListener(pageVisibilityProps.event, handleVisibilityChange, false);

        return () => {
            document.removeEventListener(pageVisibilityProps.event, handleVisibilityChange);
        };
    }, []);

    return (
        <PageVisibilityContext.Provider
            value={{
                isPageHidden: isHidden,
            }}
        >
            {children}
        </PageVisibilityContext.Provider>
    );
};

export const usePageVisibility = createUseFunction<IPageVisibilityContext>(PageVisibilityContext);
