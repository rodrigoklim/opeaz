const { defineConfig } = require("@vue/cli-service");
const path = require('path');

module.exports = defineConfig({
  publicPath: '/opeaz_dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/style/app.scss')]
    }
  }
})
