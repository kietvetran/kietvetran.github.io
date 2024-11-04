const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const { inDev } = require('./webpack.helpers');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'assets/logo/mynorjourney-512x512.png',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    // filename: '[name].[chunkhash].css',
    // chunkFilename: '[name].[chunkhash].chunk.css',
    filename: '[name].css',
    chunkFilename: '[name].chunk.css',
  }),
].filter(Boolean);
