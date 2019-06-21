const path = require('path')
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {

  const env = dotenv.config().parsed;
  
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

    return {  
    mode: process.env.NODE_ENV,
    watch: true,
    entry: path.resolve('./src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'), 
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?/i, 
          exclude: /(node_modules|bower_components)/, 
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
            }, 
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/, 
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg)$/,
          exclude: /(node_modules|bower_components)/, 
          loader: 'file-loader'
        },
      ]
    },
    devServer: {
      publicPath: '/build',
      port: 8080,
    },
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  }
}
