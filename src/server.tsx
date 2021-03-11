import * as React from "react"
import { StaticRouter } from "react-router-dom"
import { renderToString } from "react-dom/server"
import express from "express"
import { ServerStyleSheet } from "styled-components"

import App from "./App"

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

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
