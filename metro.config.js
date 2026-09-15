const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

//  1. Get Expo's default Metro config
const config = getDefaultConfig(__dirname);

// 2. Wrap it with Uniwind's compiler and point to your CSS entry
module.exports = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
});
