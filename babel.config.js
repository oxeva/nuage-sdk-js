module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: '>0.2%, not dead, not op_mini all',
                },
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
    ],
};
