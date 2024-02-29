const webpack = require('webpack')
    // import webpack from 'webpack' // (if you're using ESM)

module.exports = {

    /* ... rest of the config here ... */

    resolve: {
        alias: {
            process: "process/browser"
        },
    },

    plugins: [
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
}