// const { defineConfig } = require('@vue/cli-service')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const packageName = 'test'
const NODE_ENV = 'production'
module.exports = {
  // configureWebpack: {
  //   externals: {
  //       // CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
  //       'vue': 'Vue',
  //       // 属性名称 element-ui, 表示遇到 import xxx from 'element-ui' 这类引入 'element-ui'的，
  //       // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
  //       'element': 'ELEMENT',
  //       'axios': 'axios',
  //       'vuex': 'Vuex',
  //       'vue-router': 'VueRouter',
  //   }
  // }, 
  // 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
  publicPath: NODE_ENV === 'production' ? './' : '/',
  // 输出文件目录：在npm run build时，生成文件的目录名称 
  outputDir: `./dist/${packageName}`,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 
  assetsDir: "assets",
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 
  productionSourceMap: false,
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,
  lintOnSave: false,
  pages:{
    index:{
      // page 的入口
      entry: `./src/main.js`,
      // 模板来源
      template: `public/index.html`,
      // 在 dist/index.html 的输出
      filename: `index.html`,
      // 当使用 title 选项时，
    }
  },
  devServer: {
    open: true, // 自动打开浏览器
    host: 'localhost',
    port: 8080, // 端口
    https: false, // https
    historyApiFallback: false, // 热更新
    proxy: { // 使用代理
        '/api': {
            target: 'http://localhost:1128',  // 后台接口域名
            ws: true, // 如果要代理 websockets，配置这个参数
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  // 是否跨域
            pathRewrite:{
                '^/api':'/api'
            }
        }
    },
  },
  configureWebpack: {  //webpack的相关配置在这里
    plugins: 
        NODE_ENV === 'production'? [
            new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
                events:{
                    onEnd: {
                        delete: [   //首先需要删除项目根目录下的dist.zip
                            `./dist/${packageName}.zip`,
                        ],
                        archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                            {source: './dist', destination: `./dist/${packageName}.zip`},
                        ]
                    }
                }
            })
        ]
        :[]
  }
}
  
