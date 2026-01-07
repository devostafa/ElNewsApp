module.exports = function (api) {
  const workletsPluginOptions = {};

  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "babel-plugin-transform-typescript-metadata",
      ["react-native-worklets/plugin", workletsPluginOptions],
    ],
  };
};
