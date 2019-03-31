const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader
} = require("customize-cra");

const PATH = require("path");
function resolve(url) {
  return PATH.resolve(__dirname, "src/", url);
}

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addWebpackAlias({
    "@c": resolve("component"),
    "@pages": resolve("pages"),
    "@u": resolve("util"),
    "@connect":resolve("connect"),
    "@store":resolve("store"),
    "@s": resolve("static")

  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
   
  })
);
