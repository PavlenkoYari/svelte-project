module.exports = {
  extract: false,
  sourceMap: false,
  plugins: [
    require("autoprefixer")(),
    require('cssnano')({
            preset: 'default',
        }),
  ],
}
