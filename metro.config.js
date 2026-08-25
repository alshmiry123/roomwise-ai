const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: "./global.css",
  // Use virtual CSS during web export so clean CI installs do not depend on a generated cache file.
  // Opt into filesystem output locally with FORCE_NATIVEWIND_CSS_FILE=true when needed.
  forceWriteFileSystem: process.env.FORCE_NATIVEWIND_CSS_FILE === "true",
});
