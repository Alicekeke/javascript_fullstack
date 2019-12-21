const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-asserts-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',   //入口文件
  mode: 'development',    //指定生产环境，方便打包其他的依赖模块
  output: {               //在哪输出，命名打包好的文件
    filement: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,   //正则匹配文件
        use: ['style-loader', 'css-loader', 'sass-loader']   //指定转换器
      },
      {
        test: /\.(sc|c|sa|le)ss$/,   //匹配所有的css文件
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap:true},   //定位资源文件
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap:true,
              plugins: loader => [
                require('autoprefixer')(),
                // 可添加更多插件
              ]
            },
          },
          {
            loader: 'sass-loader',
            option: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|git)$/,    //处理图片
        include: [path.resolve(__dirname, 'src/')],
        use: ['file-loader', {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: { progressive: true, quality: 65 },
            optipng: { enabled: false },
            pngquant: { quality: '65-90', speed: 4 },
            gifsicle: { interlaced: false },  //隔行扫描
            webp: { quality: 75 }
          }
        }]
      }
    ]    
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css', //最终打包出来的文件名
      chunkFilename: '[id].[hash].css'
    }),
    new optimizeCssAssetsWebpackPlugin({}),
    new UglifyJsPlugin({
      cache: true,  //js没有变化就不压缩
      sourceMap: true,  // 开发者工具指示文件所在处
      parallel: true,   //是否启用并行压缩
    }),
    new HtmlWebpackPlugin({
      title: 'file title', //生成的文件标题
      filename: 'main.html',
      minify: { //压缩选项
        collaspseWhitespace: true,  //移除空格
        removeComments: true, //移除注释
        removeAttributeQuotes: true,  //移除双引号
      }
    }),
    new CleanWebpackPlugin({

    })
  ]

}
