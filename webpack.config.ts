const webpack = require('webpack');
const WebpackPluginGlobal = require('webpack-plugin-global');

module.exports = {
  // ... các cài đặt webpack khác

  plugins: [
    new WebpackPluginGlobal({
      'global.GENTLY': false,
      'global.process': false,
      'global.Buffer': false,
      '__filename': 'mock',
      '__dirname': 'mock',
    }),
    // ... các plugins khác
  ],
};
