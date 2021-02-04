import { css } from 'styled-components'
import {
  Heading1Styles,
  Heading3Styles,
  Heading4Styles,
  Heading5Styles,
  CodeStyles,
  Body1Styles,
  Aside2Styles,
  Heading6Styles,
  Label3Styles,
} from '../styles/Typography'

const BlogStyles = css`
  p {
    ${Body1Styles}
    margin-top: 1em;
  }

  li {
    ${Body1Styles}
  }

  h1 {
    ${Heading1Styles}
    margin-right: 2rem;
  }

  h2 {
    ${Heading3Styles}
    margin-top: 4rem;
    margin-right: 2rem;
  }

  h3 {
    ${Heading4Styles}
    margin-top: 2rem;
    margin-right: 2rem;
  }

  h4 {
    ${Heading5Styles}
    margin-top: 2rem;
    margin-right: 2rem;
  }

  h5,
  h6 {
    ${Heading6Styles}
    margin-top: 2rem;
    margin-right: 2rem;
  }

  blockquote {
    margin: 1em 4em 1em 0;

    p {
      ${Aside2Styles}
      margin: 0;
    }
  }

  code {
    ${CodeStyles}
    position: relative;
  }

  pre {
    line-height: 1;
    margin: 1rem 0;
    position: relative;

    @media screen and (min-width: 768px) {
      margin: 1rem 1rem;
    }
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  hr {
    border: none;
    margin: 2em;
    content: '. . .';
    text-align: center;
    opacity: 0.5;
  }

  img,
  .gatsby-resp-image-link {
    max-width: 100%;

    & + em {
      ${Label3Styles}
      margin-top: 1em;
      font-style: normal;
    }
  }
`

export default BlogStyles
