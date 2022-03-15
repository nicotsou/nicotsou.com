import { createGlobalStyle } from 'styled-components'

const CodeHighlighter = createGlobalStyle`
  pre[class*='language-'],
  code[class*='language-'] {
    word-spacing: normal;
    word-break: normal;
    tab-size: 4;
    hyphens: none;

    @media screen and (min-width: 780px) {
      white-space: pre;
    }
  }

  pre[class*='language-'] {
    overflow: auto;
  }

  :not(pre) > code[class*='language-'] {
    padding: 4px 6px;
    border-radius: 0.3em;
    background: rgba(var(--text-color), 0.05);
  }

  /*.namespace {} */
  .token.comment {
    opacity: 0.4;
  }

  .token.prolog,
  .token.doctype,
  .token.cdata {
    opacity: 0.65;
  }
  /* .token.punctuation {} */
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: rgba(var(--text-color), 0.85);
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    opacity: 0.65;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    opacity: 0.5;
  }
  .token.atrule,
  .token.attr-value {
    opacity: 0.8;
  }

  .token.keyword {
    opacity: 0.9;
  }

  .token.function {
    opacity: 0.65;
  }
  .token.regex,
  .token.important,
  .token.variable {
    opacity: 0.65;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }


  pre[data-line] {
    position: relative;
  }

  pre[class*='language-'] > code[class*='language-'] {
    position: relative;
    z-index: 1;
  }

  .line-highlight {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    padding: inherit 0;
    margin-top: 1em;
    box-shadow: inset 5px 0 0 rgb(var(--light-sea-green-value));
    z-index: 0;
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }

  .gatsby-highlight-code-line {
    background-color: rgba(var(--text-color), 0.05);
    display: block;
    margin: -0.125rem -3rem;
    padding: 0.125rem 3rem;
  }
`

export default CodeHighlighter
