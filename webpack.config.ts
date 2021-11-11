import * as path from "path";
import * as webpack from "webpack";
import WebExtPlugin from "web-ext-plugin";
import CopyPlugin from "copy-webpack-plugin";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";

const transpiledJsPath = path.resolve(__dirname, "_transpiled_js");
const builtExtensionPath = path.resolve(__dirname, "dist");
const firefoxProfilePath = process.env["FIREFOX_PROFILE_PATH"];

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts",
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
    filename: "index.js",
    clean: true, // clean before each build
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "statics", to: transpiledJsPath }],
    }),
    new WebExtPlugin({
      sourceDir: transpiledJsPath,
      target: "firefox-desktop",
      firefox: "firefoxdeveloperedition",
      firefoxProfile: firefoxProfilePath,
      keepProfileChanges: true,
      artifactsDir: builtExtensionPath,
      buildPackage: true,
    }),
  ],
};

export default config;
