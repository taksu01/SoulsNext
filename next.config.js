const nextTranslate = require("next-translate");

module.exports = {
  ...nextTranslate(),
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
