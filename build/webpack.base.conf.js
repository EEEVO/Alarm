var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

var webpack = require('webpack')
let HappyPack = require('happypack');
let os = require('os');
let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      // options: vueLoaderConfig
      options: {
        loaders: {
          js: 'happypack/loader?id=js' // 将loader换成happypack
        }
      }
    },
    {
      test: /\.js$/,
      // loader: 'babel-loader',
      // loader: ['babel-loader?cacheDirectory=true'],
      loader: ['happypack/loader?id=js'], // 将loader换成happypack
      include: [resolve('src'), resolve('test')],
      exclude: [path.resolve('../../node_modules')] // 不需要编译node_modules下的js 
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
    ]
  },
  cache: true,
  plugins: [
    new HappyPack({
      id: 'vue',
      threadPool: happyThreadPool,
      cache: true,
      verbose: true,
      loaders: ['vue-loader'],
    }),

    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      cache: true,
      verbose: true,
      loaders: ['babel-loader'],
    }),

    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      async: 'shared-module',
      minChunks: (module, count) => (
        count >= 2    // 当一个模块被重复引用2次或以上的时候单独打包起来。 
      )
    }),
  ]
}
