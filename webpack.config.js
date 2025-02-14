const webpack = require('webpack');

module.exports = {
  // ...existing configuration...
  plugins: [
    // ...existing plugins...
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ]
};
