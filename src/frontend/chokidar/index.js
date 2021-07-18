const webpack = require('webpack');
const chokidar = require('chokidar');
const config = require('../webpack/webpack.config');

const compiler = webpack(config);

chokidar.watch('../').on('all', () => {
  compiler.run();
});