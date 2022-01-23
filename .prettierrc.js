module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    overrides: [
        {
            files: '*.{json,css,scss}',
            options: {
                tabWidth: 2,
                singleQuote: false,
            },
        },
    ],
};
