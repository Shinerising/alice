const CopyPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  entry: "./index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "" }
      ],
    }),
    new WebpackShellPlugin({ 
      onBuildEnd:{
        scripts: [isProduction ? 'lessc --clean-css="--s1 --advanced" src/style.less dist/style.css' : 'less-watch-compiler src dist'],
        blocking: false,
        parallel: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader"
      }
    ]
  },
  resolve: { extensions: [".ts", ".js"] },
};