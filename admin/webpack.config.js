const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/.css$/,
        use:['style-loader','css-loader'],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource', // 폰트 파일을 별도 파일로 처리
        generator: {
          filename: 'fonts/[name][ext][query]', // 출력 디렉토리 및 파일 이름
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
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
}