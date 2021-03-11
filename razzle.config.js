"use strict"

// https://razzlejs.org/docs/customization
// https://github.com/jaredpalmer/razzle/blob/canary/examples/with-heroku/razzle.config.js

module.exports = {
  options: {
    //   cssPrefix: 'static/css',
    //   jsPrefix: 'static/js',
    //   mediaPrefix: 'static/media',
    //   browserslist: undefined, // or what your apps package.json says
    forceRuntimeEnvVars: ["HOST", "PORT"],
  },
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
