const webpack = require('webpack');
const environment = process.env.NODE_ENV;
const environmentConfig = require(`./config/env.${environment}.js`);
const TerserPlugin = require('terser-webpack-plugin');

module.exports = ( srcDir, destDir, dirJs ) => {
  return {
    mode: environment,
    entry: {
      "main": `${ srcDir }${ dirJs }index.js`
    },
    output: {
      filename: 'bundle.js',
      path: __dirname + destDir,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              {
                loader: "style-loader",
                options: { injectType: "singletonStyleTag" },
              },
              "css-loader",
            ],
          },
          {
            // 拡張子 .js の場合
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                // Babel を利用する
                loader: "babel-loader",
                // Babel のオプションを指定する
                options: {
                  presets: [
                    // プリセットを指定することで、ES2021 を ES5 に変換
                    "@babel/preset-env",
                  ],
                },
              },
            ],
          },
        ],
      },
    target: [ 'web', 'es5' ],
    performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 500000,
    },
    optimization: {
      minimizer: [ new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
        },
        extractComments: false,
      })],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify( environmentConfig ),
      })
    ]
  }
}