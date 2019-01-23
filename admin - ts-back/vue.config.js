module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir:'../distAdmin',
    assetsDir: 'static',
    devServer:{
        port:8027,
        host:'localhost',
        open:true
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }

}