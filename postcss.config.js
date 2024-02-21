// postcss.config.js
module.exports = {
  map: { inline: true },
  plugins: [
    require("postcss-import"),
    require("postcss-discard-comments")({
      removeAll: true,
    }),
    require("autoprefixer"),
    require("cssnano")(),
  ],
};
