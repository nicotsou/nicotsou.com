import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Colors from './Colors'
import { Body1Styles } from './Typography'

const Variables = createGlobalStyle`
  :root {
    --text-color: var(--leather-value);
    --bg-color: var(--white-value);
    --caption-color: var(--leather-value);
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
      --text-color: var(--white-value);
      --bg-color: var(--dark-leather-value);
      --caption-color: var(--white-value);
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
