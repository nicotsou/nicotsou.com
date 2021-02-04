import React from 'react'
import LayoutWireframe from '../../images/blog-wireframe.png'
import 'normalize.css'
import GlobalStyles from '../../styles/GlobalStyles'
import styled from 'styled-components'

const StyledWireframeContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.5;
`

const StyledWireframeImage = styled.img`
  display: none;
  margin: 0 auto;
  width: 908.5px;
  height: auto;

  @media (prefers-color-scheme: dark) {
    filter: invert(100%);
  }
`

const Grid = styled.div`
  display: none;
  position: absolute;
  left: 0px;
  right: 0px;
  pointer-events: none;
  -webkit-user-select: none;
  top: 0px;
  height: 500vh;
  background-image: linear-gradient(
    rgba(0, 119, 179, 0.2) 1px,
    transparent 1px
  );
  background-position: left top;
  background-size: 1px 1rem;
  background-repeat: initial initial;
`

export default function Layout({ children }) {
  return (
    <>
      <Grid />
      <GlobalStyles />
      <StyledWireframeContainer>
        <StyledWireframeImage src={LayoutWireframe} />
      </StyledWireframeContainer>
      {children}
    </>
  )
}
