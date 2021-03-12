import * as React from "react"
import { StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import express from "express"
import { ServerStyleSheet } from "styled-components"
// import webpack from "webpack"

// console.log(process.env)
// console.log({ webpack })
// console.log({ globall: global.__faviconCompilation__ })
// console.log({ proto: Object.prototype.__faviconCompilation__ })

// import HtmlWebpackPlugin from "html-webpack-plugin"

// hookIntoCompiler
// HtmlWebpackPlugin
// HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync

// Hook into the html-webpack-plugin processing and add the html
// const HtmlWebpackPlugin = compiler.options.plugins
//   .map(({ constructor }) => constructor)
//   .find(
//     /**
//      * Find only HtmlWebpkackPlugin constructors
//      * @type {(constructor: Function) => constructor is typeof import('html-webpack-plugin')}
//      */
//     constructor =>
//       constructor && constructor.name === 'HtmlWebpackPlugin'
//   );

import App from "./App"

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

// console.log({ assets: JSON.stringify(assets, null, 2) })
const favicons = [
  '<link rel="shortcut icon" href="/favicon.ico">',
  '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
  '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
  '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">',
  '<link rel="manifest" href="/manifest.json">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="theme-color" content="#3D2D6B">',
  '<meta name="application-name" content="classtimes">',
  '<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">',
  '<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">',
  '<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">',
  '<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">',
  '<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">',
  '<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">',
  '<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">',
  '<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">',
  '<link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png">',
  '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">',
  '<link rel="apple-touch-icon" sizes="1024x1024" href="/apple-touch-icon-1024x1024.png">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
  '<meta name="apple-mobile-web-app-title" content="classtimes">',
  '<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-640x1136.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-750x1334.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-828x1792.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/apple-touch-startup-image-1125x2436.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/apple-touch-startup-image-1242x2208.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/apple-touch-startup-image-1242x2688.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-1536x2048.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-1668x2224.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-1668x2388.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-2048x2732.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/apple-touch-startup-image-1620x2160.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-1136x640.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-1334x750.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-1792x828.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/apple-touch-startup-image-2436x1125.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/apple-touch-startup-image-2208x1242.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/apple-touch-startup-image-2688x1242.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-2048x1536.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-2224x1668.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-2388x1668.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-2732x2048.png">',
  '<link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/apple-touch-startup-image-2160x1620.png">',
  '<link rel="icon" type="image/png" sizes="228x228" href="/coast-228x228.png">',
  '<meta name="msapplication-TileColor" content="#3D2D6B">',
  '<meta name="msapplication-TileImage" content="/mstile-144x144.png">',
  '<meta name="msapplication-config" content="/browserconfig.xml">',
  '<link rel="yandex-tableau-widget" href="/yandex-browser-manifest.json">',
]
//.map((a) => a.replace(`href="`, `href="${process.env.PUBLIC_PATH}`))

// console.log({ env: process.env })

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : ""
}

const jsScriptTagsFromAssets = (assets, entrypoint, extra = "") => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : ""
}

export function renderApp(req, res) {
  // Create the server side style sheet
  const sheet = new ServerStyleSheet()
  const context = {}

  // When the app is rendered collect the styles that are used inside it
  const markup = renderToString(
    sheet.collectStyles(
      <StaticRouter {...{ context }} location={req.url}>
        <App />
      </StaticRouter>
    )
  )

  // Generate all the style tags so they can be rendered into the page
  const styleTags = sheet.getStyleTags()

  let html, redirectUrl
  if (context.url) {
    redirectUrl = context.url
  } else {
    html = `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>ClassTimes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${favicons.join("\n")}
        ${cssLinksFromAssets(assets, "client")}
        <!-- Render the style tags gathered from the components into the DOM -->
        ${styleTags}  
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, "client", " defer crossorigin")}
    </body>
</html>`
  }

  return {
    redirectUrl,
    html,
  }
}

// express.webpack
// console.log("HI----")

const server = express()
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", (req, res) => {
    const { html, redirectUrl } = renderApp(req, res)
    if (redirectUrl) {
      res.redirect(redirectUrl)
    } else {
      res.status(200).send(html)
    }
  })

export default server
