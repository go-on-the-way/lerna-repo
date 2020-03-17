const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //https://vue-loader.vuejs.org/guide/#manual-setup
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [
  // It is responsible for cloning any other rules you have defined and applying them to the corresponding language blocks in .vue files.
  new VueLoaderPlugin()
];

let entry = {
  'w-ui': './src/main.js'
};

let output = {
  library: 'w-ui',
  libraryTarget: 'umd',
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist')
};

module.exports = env => {
  if (env && env.demo) {
    entry = {
      'demo/demo': './demo/demo.js'
    };
    output = {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    };
    plugins.splice(plugins.length - 1, 0, ...[
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'w-ui demo',
        chunks: ['demo/demo'],
        filename: 'demo/demo.html',
        template: 'demo/demo.html'
      })
    ])
  }

  return {
    entry: entry,
    output: output,
    resolve: {
      alias: {
        comp: path.resolve(__dirname, 'src/components/')
      },
      extensions: [".js", ".vue"]
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }, {
          test: /\.vue$/,
          loader: 'vue-loader'
        }, {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }, {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }, {
          test: /\.scss$/,
          use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }]
        }
      ]
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    },
    plugins: plugins
  }
}
