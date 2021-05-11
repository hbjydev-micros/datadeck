const path = require('path');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    mode: production ? 'production' : 'development',
    entry: './src/static/datadeck.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'static'),
        filename: 'bundle.js'
    }
};