const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/core/app.tsx',

  output: {
    path: path.resolve(__dirname, '../assets'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/core/index.html',
      inject: 'head',
      filename: 'html/app.html'
    }),

    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      cleanAfterEveryBuildPatterns: ['!**/*.html'],
      cleanOnceBeforeBuildPatterns: ['**/*.js', '**/*.json']
    })
  ],

  optimization: {
    runtimeChunk: true,
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};