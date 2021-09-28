module.exports = function (config) {
  config.module.rules
    .filter(rule => (
      rule.test
        .toString()
        .match(/css|less|scss|sass/)
    ))
    .forEach(rule => {
      const cssLoader = rule.use.find(use => use.loader === 'css-loader');
      cssLoader.options.modules = true;
    });

  return config;
}