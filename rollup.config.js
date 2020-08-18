export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'lib/time-bandit.js',
    },
  },
  // ES
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      file: 'es/time-bandit.js',
    },
  },
];
