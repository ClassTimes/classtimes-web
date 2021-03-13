import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"

import { ApolloProvider } from "./network/Apollo"

import App from "./App"

hydrate(
  <ApolloProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
