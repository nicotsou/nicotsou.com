import React from 'react'
import styled from 'styled-components'
import { ProximaFont } from '../styles/LandingTypography'
import Logo from '../components/Layout/Logo'
import Seo from '../components/seo'

const Main = styled.main`
  margin: 0 auto;
  max-width: 700px;
  padding: 0 1rem;
  --text-color: var(--raw-umber-value);
  --caption-color: var(--raw-umber-value);
  color: rgb(var(--raw-umber-value));
`

const StyledLogo = styled(Logo)`
  margin-top: calc(100vh * 20 / 100);
`

const StyledAside1 = styled.h1(ProximaFont)

const NotFoundPage = () => {
  return (
    <Main>
      <Seo title="TLTR; TypeScript" />
      <a href="https://nicotsou.com">
        <StyledLogo />
      </a>
      <StyledAside1>TLTR; TypeScript</StyledAside1>
      <p>This page was intentionally left blank.</p>
    </Main>
  )
}

export default NotFoundPage
