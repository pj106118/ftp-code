const path = require("path");
function resolve(dir) {
  path.join(__dirname, dir);
}

module.exports = {
  assetsDir: "static",
  publicPath: "./",
  lintOnSave: false, //关闭语法检查
  configureWebpack: {
    resolve: {
      extensions: ["js", "vue"],
      alias: {
        "@": resolve("src"),
      },
    },
  },



  devServer: {
    proxy: {
      "/geekplus": {
        target: "http://localhost:8082",
        pathRewrite: { "^/geekplus": "geekplus" },
      },
    },
    host: "0.0.0.0",
    port: 8080,
  },

  //A 0
  // devServer: {
  //   proxy: {
  //     "/fe": {
  //       target: "http://localhost:8889",
  //       pathRewrite: { "^/fe": "fe" },
  //     },
  //   },
  //   host: "0.0.0.0",
  //   port: 8080,
  // },
  //A  1
};
