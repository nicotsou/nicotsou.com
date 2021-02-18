import styled, { css } from 'styled-components'
import '@fontsource/merriweather/300.css'
import '@fontsource/merriweather/700.css'
import '@fontsource/merriweather-sans/300.css'
import '@fontsource/ubuntu/300.css'
import '@fontsource/inconsolata/400.css'

export const Body1Styles = css`
  min-height: 0vw;
  font-size: clamp(17px, calc(100vw * 1.9 / 100), 20px);
  line-height: 1.7rem;
  font-family: 'Merriweather Sans', sans-serif;
  font-weight: 300;
  word-spacing: 0.13rem;
`

export const Body2Styles = css`
  && {
    font-size: 0.95rem;
    line-height: 1.5rem;
    margin: 0;
  }
`

export const Body3Styles = css`
  && {
    font-size: 0.9rem;
    line-height: 1.25rem;
    margin: 0;
  }
`

export const Heading1Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 2.2rem;
  line-height: 1.558;
  letter-spacing: -0.01rem;
  word-spacing: 0.26rem;
  margin-top: 1rem;
  margin-bottom: 3.3rem;
`

export const Heading2Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 2.25rem;
  letter-spacing: -0.03rem;
  word-spacing: 0.175rem;
`

export const Heading3Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2.1rem;
  letter-spacing: -0.0055rem;
  word-spacing: 0.1rem;
`

export const Heading4Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.8rem;
  letter-spacing: -0.0055rem;
  word-spacing: 0.1rem;
`

export const Heading5Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25rem;
  letter-spacing: -0.0055rem;
  word-spacing: 0.005rem;
`

export const Heading6Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.25rem;
  letter-spacing: -0.0055rem;
  word-spacing: 0.005rem;
`

export const Label1Styles = css`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  line-height: 1.55rem;
  word-spacing: -0.095rem;
  letter-spacing: -0.02rem;
  color: rgba(var(--caption-color), 0.5);
`

export const Label2Styles = css`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  line-height: 1.35rem;
  word-spacing: 0.1rem;
  letter-spacing: 0.0675rem;
  text-transform: uppercase;
  color: rgba(var(--caption-color), 0.5);
`

export const Label3Styles = css`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 0.7rem;
  line-height: 1rem;
  word-spacing: 0.02rem;
  letter-spacing: 0.06rem;
  text-transform: uppercase;
  color: rgba(var(--caption-color), 0.5);
`

export const CodeStyles = css`
  font-family: 'Inconsolata', monospace;
  font-weight: 400;
  font-size: 1.05rem;
  line-height: 1.4rem;
  word-spacing: 0.02rem;
  letter-spacing: 0;
`

export const Aside1Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 2.25rem;
  letter-spacing: -0.03rem;
  word-spacing: 0.175rem;
`

export const Aside2Styles = css`
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 1.68;
  letter-spacing: -0.03rem;
  word-spacing: 0.175rem;

  b,
  strong {
    font-weight: 700;
  }
`

export const Body1 = styled.p(Body1Styles)
export const Body2 = styled.p(Body2Styles)
export const Body3 = styled.p(Body3Styles)
export const Heading1 = styled.h1(Heading1Styles)
export const Heading2 = styled.h2(Heading2Styles)
export const Heading3 = styled.h3(Heading3Styles)
export const Heading4 = styled.h4(Heading4Styles)
export const Heading5 = styled.h5(Heading5Styles)
export const Heading6 = styled.h6(Heading6Styles)
export const Label1 = styled.div(Label1Styles)
export const Label2 = styled.div(Label2Styles)
export const Label3 = styled.div(Label3Styles)
export const Code = styled.div(CodeStyles)
export const Aside1 = styled.div(Aside1Styles)
export const Aside2 = styled.div(Aside2Styles)
