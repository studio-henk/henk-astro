// postcss.config.js
module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-discard-comments")({
      removeAll: true,
    }),
    require("autoprefixer"),
    require("cssnano")(),
  ],
};
