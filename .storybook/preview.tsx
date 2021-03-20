import * as React from "react"

export const decorators = [
  (Story) => (
    <div style={{ margin: "3em" }}>
      <Story />
    </div>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
