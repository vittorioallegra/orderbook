import * as React from 'react';

type ReactContext<T> =
    | React.Context<T>
    | React.Context<T | null>
    | React.Context<T | undefined>
    | React.Context<T | null | undefined>;

export function createUseFunction<T>(context: ReactContext<T>): () => NonNullable<T> {
    return (): NonNullable<T> => {
        const value: T | null | undefined = React.useContext<T>(context as any);

        if (!value) {
            throw Error(`Tried to access ${context.displayName ?? ''}, but it has not been initialized yet.`);
        }

        return value as NonNullable<T>;
    };
}
