export const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat('en-US', options).format(value);

export const formatSpread = (value: number) =>
    formatNumber(value, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const formatPrice = (value: number) =>
    formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
