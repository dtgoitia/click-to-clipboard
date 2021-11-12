import CopyPlugin from "copy-webpack-plugin";
import * as webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";

import commonConfig, { transpiledJsPath } from "./common";

const config: webpack.Configuration = {
  ...commonConfig,
  mode: "development",
  entry: {
    index: "./src/index-web.tsx",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "statics/common", to: transpiledJsPath },
        { from: "statics/webapp", to: transpiledJsPath },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: transpiledJsPath,
      watch: true,
    },
    compress: true,
    port: 3000,
    open: true,
    liveReload: true,
    hot: true,
  },
};

export default config;
