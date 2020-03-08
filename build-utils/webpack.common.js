const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.css',
      '.scss',
      '.svg',
      '.jpeg',
      '.png',
    ],
    alias: {
      components: path.resolve(paths.appSrc, 'components'),
      pages: path.resolve(paths.appSrc, 'pages'),
      redux: path.resolve(paths.appSrc, 'redux'),
      reducers: path.resolve(paths.appSrc, 'redux/reducers'),
      actions: path.resolve(paths.appSrc, 'redux/actions'),
      types: path.resolve(paths.appSrc, 'redux/types'),
      sagas: path.resolve(paths.appSrc, 'redux/sagas'),
      selectors: path.resolve(paths.appSrc, 'redux/selectors'),
      helpers: path.resolve(paths.appSrc, 'redux/helpers'),
      assets: path.resolve(paths.appAssets),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new FaviconsWebpackPlugin('./public/favicon.png'),
  ],
  output: {
    path: path.resolve(__dirname, '../', 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
};
