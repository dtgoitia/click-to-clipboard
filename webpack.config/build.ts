/**
 * Check these two links:
 *   Firefox: https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/#distributing-your-addon
 *   Chrome: https://developer.chrome.com/docs/webstore/publish/
 * and automate the process in CI
 */
import CopyPlugin from "copy-webpack-plugin";
import * as webpack from "webpack";

import commonConfig, { transpiledJsPath } from "./common";

const config: webpack.Configuration = {
  ...commonConfig,
  mode: "production",
  watch: false,
  optimization: {
    minimize: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "statics/common", to: transpiledJsPath },
        { from: "statics/extension", to: transpiledJsPath },
      ],
    }),
  ],
};

export default config;
