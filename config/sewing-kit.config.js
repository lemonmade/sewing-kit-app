/* eslint-env node */

module.exports = function createConfig(plugins) {
  return {
    name: 'example',
    plugins: [
      plugins.cdn('http://localhost:8080/'),
    ],
  };
};
