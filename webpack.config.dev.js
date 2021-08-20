const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: [
      './modules/index.ts',
      './src/styles/style.scss'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['./modules', 'node_modules' ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          "sass-loader",
        ],
      },
      {
        test: /\.png/ || /\.jpg/,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'aplication/font-woff',
            name: "[name].[ext]",
            outputPath: '../fonts/',
            publicPath: '../fonts/',
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyPlugin({ // CONFIGURACIÓN DEL COPY PLUGIN
      patterns: [
        {
          from: path.resolve(__dirname, "src", 'assets/images'), // CARPETA A MOVER AL DIST
          to: "assets/images" // RUTA FINAL DEL DIST
        }
      ]
    }),
    //new BundleAnalyzerPlugin()
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./dist/*.html', './dist/*.css', './dist/*.js'],
      server: { baseDir: ['dist'] }
    }),
  ],
  
}