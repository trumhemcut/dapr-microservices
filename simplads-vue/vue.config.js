module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: "http://localhost:8081/"
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
