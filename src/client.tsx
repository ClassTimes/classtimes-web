import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { hydrate } from "react-dom"

import App from "./App"

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
