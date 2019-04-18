module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir:'../distView',
    assetsDir: 'static',
    devServer:{
        port:8028,
        host:'localhost',
        open:true
    },
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    }

}