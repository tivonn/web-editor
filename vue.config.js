module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: 'error',
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      css: {
        localsConvention: 'camelCase'
      },
      scss: {
        prependData: '@import "~@/assets/css/variables.scss";'
      }
    }
  },
  configureWebpack: (config) => {
    config.devtool = '@inline-source-map'
    config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
  },
  chainWebpack: (config) => {
    config.module.rule('eslint').use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
    config.module.rule('vue').use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
  }
}
