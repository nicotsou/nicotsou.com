import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  transition: opacity 300ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  filter: grayscale(1) opacity(0.2) brightness(1.2) contrast(1.3);

  > div {
    width: 100vw;
    height: 100vh;
  }

  > img,
  > picture {
    backface-visibility: hidden;
  }
`

const transitionStyles = {
  entering: { backgroundColor: 'red', opacity: 1 },
  entered: { backgroundColor: 'red', opacity: 1 },
  exiting: { opacity: 0, backgroundColor: 'red' },
  exited: { opacity: 0, backgroundColor: 'red' },
}

const DynamicCover = ({ cover, visible }) => {
  const coverImage = getImage(cover)
  return (
    <Transition in={visible} timeout={1000}>
      {(state) => (
        <BackgroundImage style={transitionStyles[state]}>
          {coverImage && <GatsbyImage image={coverImage} />}
        </BackgroundImage>
      )}
    </Transition>
  )
}

export default DynamicCover
