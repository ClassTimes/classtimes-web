import * as React from "react"
import { render } from "@testing-library/react"
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

const Providers: React.FC = (props) => {
  const { children } = props

  // <ThemeProvider theme="light">
  //   <TranslationProvider messages={defaultStrings}>

  return <>{children}</>
}

const customRender = (ui: React.ReactElement, options: {}) =>
  render(ui, { wrapper: Providers, ...options })

export * from "@testing-library/react"

export { customRender as render }
