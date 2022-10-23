module.exports = {
  //根据屏幕大小自动缩放适配
  css: {
      loaderOptions: {
          css: {
              // options here will be passed to css-loader
          },
          postcss: {
              // options here will be passed to postcss-loader
              plugins: [require('postcss-px2rem')({
                  remUnit: 192,  //屏幕适配
              })]
          }
      }
  },
  
  lintOnSave:false, //取消eslint检测
  productionSourceMap: false,  //设为false可减小打包后包体积，默认为true
  publicPath: '/cm/',  //配置域名根路径，从localhost/#/配置后成localhost/cm#/，注意路由应使用hash 
  devServer: {
      overlay:{
          warning:false,
          error:true
      },
      host: '0.0.0.0',
      port: 8060,  
      // open: true,  //自动打开浏览器
  },
  assetsDir: "static"  //设置打包后静态资源放在static文件夹里
} 