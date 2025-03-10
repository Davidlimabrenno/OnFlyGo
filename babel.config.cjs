module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        useBuiltIns: 'entry',
        corejs: 3,
        modules: 'auto',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-transform-modules-commonjs',
  ],
}
