const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, args) => {
  return {
    mode: args.mode,
    entry: './src/index.ts',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: args.mode === 'development',
                url: false,
                modules: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', { grid: true }]
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: args.mode === 'development'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      port: 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html')
      })
    ]
  }
}