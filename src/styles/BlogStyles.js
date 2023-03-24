import { css } from 'styled-components'
import { DividerStyles } from '../components/Layout/Divider'
import {
  Heading1Styles,
  Heading2Styles,
  Heading3Styles,
  Heading4Styles,
  Heading5Styles,
  CodeStyles,
  Body1Styles,
  Aside1Styles,
  Heading6Styles,
  Label2Styles,
} from '../styles/Typography'

const BlogStyles = css`
  p {
    ${Body1Styles}
    margin: 1em 0;
  }

  li {
    ${Body1Styles}
  }

  h1 {
    ${Heading1Styles}
    margin-right: 2rem;
  }

  h2 {
    ${Heading2Styles}
    margin-top: 7rem;
    margin-right: 2rem;
  }

  h3 {
    ${Heading3Styles}
    margin-top: 5rem;
    margin-right: 2rem;
  }

  h4 {
    ${Heading4Styles}
    margin-top: 4rem;
    margin-right: 2rem;
  }

  h5 {
    ${Heading5Styles}
    margin-top: 4rem;
    margin-right: 2rem;
  }

  h6 {
    ${Heading6Styles}
    margin-top: 2rem;
    margin-right: 2rem;
  }

  blockquote {
    margin: 3rem 0 4rem 3rem;

    p {
      ${Aside1Styles}
      margin: 0;
    }

    @media screen and (min-width: 480px) {
      margin: 4rem 2rem 5rem 7rem;
    }

    @media screen and (min-width: 900px) {
      margin: 6rem -2rem 5rem 7rem;
    }
  }

  strong,
  i {
    font-weight: 500;
  }

  code {
    ${CodeStyles}
    position: relative;
  }

  pre {
    background-color: rgba(var(--text-color), 0.05);
    border-radius: calc(0.9 * 1rem);
    line-height: 1;
    padding: 0.88rem 1rem;
    margin: 2rem 0;
    position: relative;
    max-width: 100%;

    @media screen and (min-width: 927px) {
      border-radius: calc(1.5 * 1rem);
      padding: 2.4rem 3rem;
      margin: 3rem -3rem;
      max-width: auto;
    }
  }

  ul,
  ol {
    margin: 2rem 0;
    padding-left: 1.5rem;

    ul,
    ol {
      margin: 1rem 0;
    }
  }

  hr {
    ${DividerStyles}
  }

  details {
    margin-bottom: 1rem;
    transition: max-height 0.1s ease;
    height: auto;
    max-height: 1.5rem;

    &[open] {
      max-height: 99rem;
      transition: max-height 0.6s ease;
    }

    summary {
      cursor: pointer;
    }
  }

  .gatsby-resp-image-wrapper {
    width: 100vw;
    max-width: calc(640px + 2rem) !important;
    margin: 2rem auto 2rem -1rem !important;

    @media screen and (min-width: 780px) {
      max-width: 100vw !important;
      margin: 5rem 0 5rem calc(-50vw + 375px) !important;
    }

    @media screen and (min-width: 1200px) {
      max-width: calc(750px + 40%) !important;
      margin: 5rem auto 5rem -20% !important;
      border-radius: calc(1.5 * 1rem);
    }
  }

  :not(.gatsby-resp-image-wrapper) {
    img:not([role='presentation']) {
      width: 100vw;
      max-width: calc(640px + 2rem);
      margin: 2rem auto 2rem -1rem;

      @media screen and (min-width: 780px) {
        max-width: 100vw;
        margin: 5rem 0 5rem calc(-50vw + 375px);
      }

      @media screen and (min-width: 1200px) {
        max-width: calc(750px + 40%);
        margin: 5rem auto 5rem -20%;
      }
    }
  }

  :not(.gatsby-resp-image-wrapper) img,
  .gatsby-resp-image-wrapper,
  p > .gatsby-resp-image-wrapper {
    & + em {
      ${Label2Styles}
      margin-top: 2rem;
      margin-bottom: 3rem;
      display: block;
      font-style: normal;

      @media screen and (min-width: 780px) {
        margin-top: -4rem;
        margin-bottom: 5rem;
      }
    }
  }

  .gatsby-resp-iframe-wrapper {
    width: 100vw;
    max-width: calc(640px + 2rem) !important;
    margin: 2rem auto 2rem -1rem !important;

    @media screen and (min-width: 780px) {
      max-width: 100vw;
      margin: 5rem 0 5rem calc(-50vw + 375px);
    }

    @media screen and (min-width: 1200px) {
      max-width: calc(750px + 40%) !important;
      margin: 5rem auto 5rem -20% !important;
      border-radius: calc(1.5 * 1rem);
    }
  }

  small {
    ${Label2Styles}
  }
`

export default BlogStyles
