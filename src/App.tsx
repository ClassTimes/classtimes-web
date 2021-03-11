import * as React from "react"
import { Route, Switch } from "react-router-dom"

import { AppGlobalStyles } from "./App.styles"
import Home from "./Home"

const App = () => {
  return (
    <>
      <AppGlobalStyles />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  )
}

export default App
