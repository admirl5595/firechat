module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@res": "./src/res",
            "@services": "./src/services",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@firebase-config": "./firebase-config",
          },
        },
      ],
    ],
  };
};
