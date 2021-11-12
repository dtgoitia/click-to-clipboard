import * as path from "path";
import * as webpack from "webpack";

// in case you run into any typescript error when configuring `devServer`
// import "webpack-dev-server";

export const rootDir = path.resolve(__dirname, "..");
export const transpiledJsPath = path.join(rootDir, "_transpiled_js");

const commonConfig: webpack.Configuration = {
  entry: {
    index: "./src/index-extension.tsx",
  },
  mode: "production", // if not "production", firefox extension breaks
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: transpiledJsPath,
    filename: "[name].js",
    clean: true, // clean before each build
  },
  optimization: {
    minimize: false,
  },
};

export default commonConfig;
