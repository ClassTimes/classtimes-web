import { createGlobalStyle } from "styled-components"

export const AppGlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --colors-primary: #000;
  }

  html,
  body {
    margin: 0;
    padding: 0;

    min-height: 100%;
  }

  body {
    font-family: sans-serif;
    width: 100%;
    color: var(--colors-primary);
  }

  html,
  body,
  #root {
    height: 100%;
  }
`
