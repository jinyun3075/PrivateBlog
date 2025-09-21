const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mode:"development",
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/admin/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]',
        },
      },
    ]
  },
  devServer: {
    port: 3001,
    hot:true,
    historyApiFallback: true,  
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/img',
          to: 'img',
          noErrorOnMissing: true
        },
        {
          from: 'public/fonts',
          to: 'fonts',
          noErrorOnMissing: true
        }
      ]
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
}