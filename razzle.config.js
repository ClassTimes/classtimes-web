// https://razzlejs.org/docs/customization

module.exports = {
  // options: {
  //   cssPrefix: 'static/css',
  //   jsPrefix: 'static/js',
  //   mediaPrefix: 'static/media',
  //   browserslist: undefined, // or what your apps package.json says
  // },
  // modify: require("razzle-heroku"),
  experimental: {
    newBabel: true,
    newExternals: true,
    newSplitChunks: true,
    newContentHash: true,
    newMainFields: true,
    reactRefresh: true,
  },
}
