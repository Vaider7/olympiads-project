const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //This property defines where the application starts
  entry:'./App.tsx',

  //This property defines the file path and the file name which will be used for deploying the bundled file
  output:{
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  //Setup loaders
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
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss']
  },

  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/core/index.html'
    })
  ]
}