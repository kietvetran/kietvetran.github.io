const path = require('path');
const webpack = require('@eika-infrastruktur/webpack-dev');

const TARGET = process.env.npm_lifecycle_event;

const context = '/sparing-spareadmin-intraweb';

const PATHS = {
    dirname: __dirname,
    src: path.join(__dirname, 'src'),
    app: path.join(__dirname, 'src', 'index'),
    build: path.join(__dirname, 'public'),
    publicPath: TARGET === 'start' ? '/' : context
};
const config = webpack.build({
    PATHS,
    TARGET,
    eikaView: false,
    INCLUDEALL: true,
    proxyContext: context,
    proxyTarget: 'http://localhost:8117',
});
module.exports = config;
