const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  //publicPath取代了baseUrl
  publicPath: './',

  outputDir: 'dist',
  assetsDir: "assets",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: false,

  //关键点在这  原来的 Compiler 换成了 runtimeCompiler
  runtimeCompiler: true,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: (config) => {
    config
      .plugin('fork-ts-checker')
      .tap((args) => {
        const params = [...args];
        params[0].typescript.configFile = path.join(__dirname, `/tsconfig.json`);
        return params;
      });
    config.resolve
      .alias
      .set('@app', path.join(__dirname, process.env.VUE_APP_APP_PATH, '/'));
    config.module.rule('file')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
      .tap((options) => ({
        name: 'assets/[name].[hash:8].[ext]',
      }))
      .end();
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
      // 开启gzip压缩
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.ts$|\.html$|\.json$|\.css/,
        threshold: 10240,
        minRatio: 0.8,
      }));
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              // name(module) {
              //   // get the name. E.g. node_modules/packageName/not/this/part.js
              //   // or node_modules/packageName
              //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              //   // npm package names are URL-safe, but some servers don't like @ symbols
              //   return `${packageName.replace('@', '')}`;
              // },
            },
          },
        },
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'], // 移除console
              },
            },
          }),
        ],
      };
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 ts 文件的性能提示
        assetFilter(assetFilename) {
          return assetFilename.endsWith('.ts');
        },
      };
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';

      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              // name(module) {
              //   // get the name. E.g. node_modules/packageName/not/this/part.js
              //   // or node_modules/packageName
              //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              //   // npm package names are URL-safe, but some servers don't like @ symbols
              //   return `${packageName.replace('@', '')}`;
              // },
            },
          },
        },
      };
    }
   },

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8088,
    hot: true,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: {

      '/api': {
        target: process.env.VUE_APP_BASE_URL, // 代理服务器路径
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 去掉接口地址中的api字符串
        },
      }
    },
  },

  css: {
    // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    // sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: { // css预设器配置项
      sass: {
        // 映入全局样
        /**
         * sass-loader v8- 这个选项名为“data”
         * sass-loader v8 这个选项名为“prependData”
         * sass-loader v8- 这个选项名为“additionalData”
         */
        additionalData: '@import "@/styles/style.scss";',
        // additionalData: '@import "@/styles/mixin.scss";',
        // eslint-disable-next-line no-dupe-keys
        additionalData: '@import "@/styles/ant-design.scss";',
        // prependData: '@import "@/styles/font.scss";',
        // loaderOptions: {
        //   javascriptEnabled: true,
        //   }
      },
      // loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
      // }
      // scss: {
      //   // 映入全局样式
      //   additionalData: '@use "@/styles/style.scss";',
      //   additionalData: '@import "@/styles/mixin.scss";',
      //   additionalData: '@use "@/styles/element-reset.scss";',
      //   additionalData: '@use "@/styles/font.scss";',
      // },
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
