import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Colors from './Colors'
import { Body1Styles } from './Typography'

const Variables = createGlobalStyle`
  :root {
    --text-color: var(--ukraine-blue-value);
    --bg-color: var(--ukraine-yellow-light-value);
    --caption-color: var(--ukraine-blue-value);
  }
`

const ColorStyles = createGlobalStyle`
  // Light mode
  body {
    background: rgb(var(--bg-color));
    color: rgb(var(--text-color));
  }

  // Dark mode
  @media (prefers-color-scheme: dark) {
    :root {
      --text-color: var(--ukraine-yellow-light-value);
      --bg-color: var(--ukraine-blue-dark-value);
      --caption-color: var(--ukraine-yellow-light-value);
    }
  }
`

const FontFixStyles = createGlobalStyle`
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
`

const AnchorStyles = createGlobalStyle`
  a,
  a:visited,
  a:active {
    color: inherit;
    text-decoration: underline;
  }

  a:hover {
    color: rgba(var(--text-color), 0.5);
  }
`

const TextDecorationStyles = createGlobalStyle`
  html {
    ${Body1Styles}
  }

  b,
  strong {
    font-weight: 500;
  }
`

const GlobalStyles = () => {
  return (
    <>
      <Colors />
      <Variables />
      <ColorStyles />
      <FontFixStyles />
      <AnchorStyles />
      <TextDecorationStyles />
    </>
  )
}

export default GlobalStyles
