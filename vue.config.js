"use strict"
const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ["js", "css"]
const defaultTitle = require("./package.json").description
const packageName = require("./package.json").name
const isProduction = process.env.NODE_ENV === "production"

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultTitle || "常规vue2模板" // 标题

// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  publicPath: "/xxc-vue2/",
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "static",
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: !isProduction,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 9100,
    open: false,
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins: isProduction
      ? [
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp(
            "\\.(" + productionGzipExtensions.join("|") + ")$"
          ),
          threshold: 10240,
          minRatio: 0.8,
        }),
      ]
      : [],
    name: name,
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageName}`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${packageName}`,
      filename: `[name].[hash].js`,
      chunkFilename: `[name].[hash].js`,
    },
  },
  chainWebpack (config) {
    config.plugins.delete("preload") // TODO: need test
    config.plugins.delete("prefetch") // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons/svg'))
      .end()
    config.module
      .rule('icons')// 定义一个名叫 icons 的规则
      .test(/\.svg$/)// 设置 icons 的匹配正则
      .include.add(path.join(__dirname, 'src/assets/icons/svg'))// 设置当前规则的作用目录，只在当前目录下才执行当前规则
      .end()
      .use('svg-sprite')// 指定一个名叫 svg-sprite 的 loader 配置
      .loader('svg-sprite-loader')// 该配置使用 svg-sprite-loader 作为处理 loader
      .options({// 该 svg-sprite-loader 的配置
        symbolId: 'icon-[name]'
      })
      .end()
    // config.module
    //   .rule('fonts')
    //   .test(/\.(ttf|woff|woff2|eot|otf)(\?.*)?$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap((options) => {
    //     options = {
    //       ...options,
    //       limit: 1024 * 1024,
    //       name: 'fonts/[name].[hash:7].[ext]',
    //     }
    //     return options
    //   })
    //   .end()
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .tap((options) => {
    //     // 修改选项
    //     return options
    //   })
    //   .end()


    config.module
      .rule("fonts")
      .test(/\.(ttf|woff)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options = {
          ...options,
          limit: 1024 * 1024,
          name: "[name].[hash:7].[ext]",
        }
        return options
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", (config) =>
        config.devtool("cheap-source-map")
      )

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.runtimeChunk("single")
    })
  },
}
