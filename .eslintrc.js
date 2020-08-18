module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  overrides: [
    {
      files: ['test/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      env: {
        jest: true,
      },
    },
  ],
};
