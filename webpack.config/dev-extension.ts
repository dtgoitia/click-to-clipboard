import CopyPlugin from "copy-webpack-plugin";
import WebExtPlugin from "web-ext-plugin";
import * as webpack from "webpack";

import commonConfig, { transpiledJsPath } from "./common";

const firefoxProfilePath = process.env["FIREFOX_PROFILE_PATH"];

const config: webpack.Configuration = {
  ...commonConfig,
  // This config must not be run as `webpack serve`, hence the
  // config itself must specify that webpack should watch for
  // changes.
  watch: true,
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "statics/common", to: transpiledJsPath },
        { from: "statics/extension", to: transpiledJsPath },
      ],
    }),
    new WebExtPlugin({
      sourceDir: transpiledJsPath,
      target: "firefox-desktop",
      firefox: "firefoxdeveloperedition",
      firefoxProfile: firefoxProfilePath,
      keepProfileChanges: true,
    }),
    new WebExtPlugin({
      sourceDir: transpiledJsPath,
      target: "chromium",
      keepProfileChanges: true,
    }),
  ],
};

export default config;
