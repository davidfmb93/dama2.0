const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin"),
postcssCustomProperties = require('postcss-custom-properties'),
autoprefixer = require('autoprefixer'),
BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: [
      './modules/index.ts',
      './src/sass/global.scss'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    // assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx','.tsx', '.ts', '.js'],
    modules: ['./modules', 'node_modules' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use:  [ 'ts-loader'], // aca quede "sass-loader"   "style-loader", "css-loader"
        exclude: /node_modules/,
      },
      {
        test: /\.css|.s[ac]ss$/i,
        use: [
          'style-loader',
          {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  publicPath: '/dist/css/',
                  esModule: false,
              }
          },
          {
              loader: 'css-loader',
              options: {
                  url: false,
                  importLoaders: 1,
                  sourceMap: true
              }
          },
          {
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
          }
        ]
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
      filename: 'css/main.css'
    }),
    //new BundleAnalyzerPlugin()
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./dist/*.html', './dist/*.css', './dist/*.js'],
      server: { baseDir: ['dist'] },
      single: true
    }),
  ],
  
}
