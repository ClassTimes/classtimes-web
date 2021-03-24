import * as React from "react"
// import * as ReactDOM from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import express from "express"
import {
  ServerStyleSheet,
  // StyleSheetManager
} from "styled-components"
import { renderToStringWithData } from "@apollo/client/react/ssr"
// import parse from "html-react-parser"

import { FAVICONS } from "./assets/favicons"
import { ApolloProvider, APOLLO_CLIENT } from "./network/Apollo"

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

export function generateHtml(props) {
  const { content, initialState, styleTags, jsContent } = props
  return `<!doctype html>
          <html>
            <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta char-set="utf-8" />
              <title>Classtimes</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              ${FAVICONS.join("\n")}
              ${cssLinksFromAssets(assets, "client")}
              ${styleTags}
            </head>
            <body>
              <div id="root">${content}</div>
              <script>
                window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
                  /</g,
                  "\\u003c"
                )};
              </script>
              ${jsContent}
            </body>
          </html>
        `
}

export async function renderApp(req, res) {
  const sheet = new ServerStyleSheet()
  const context = {}

  let rootElement = sheet.collectStyles(
    <ApolloProvider>
      <StaticRouter {...{ context }} location={req.url}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  )

  let content = await renderToStringWithData(rootElement)

  const styleTags = sheet.getStyleTags()
  sheet.seal()

  const initialState = APOLLO_CLIENT.extract()

  const jsContent = jsScriptTagsFromAssets(
    assets,
    "client",
    " defer crossorigin"
  )

  // res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`)
  // res.end()

  // Generate all the style tags so they can be rendered into the page

  let html, redirectUrl
  if (context.url) {
    redirectUrl = context.url
  } else {
    html = generateHtml({
      content,
      styleTags,
      jsContent,
      initialState,
    })
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
  .get("/*", async (req, res) => {
    const { html, redirectUrl } = await renderApp(req, res)
    if (redirectUrl) {
      res.redirect(redirectUrl)
    } else {
      res.status(200).send(html)
    }
  })

export default server
