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
  entering: { backgroundColor: 'rgba(var(--bg-color), 0.5)', opacity: 1 },
  entered: { backgroundColor: 'rgba(var(--bg-color), 0.5)', opacity: 1 },
  exiting: { opacity: 0, backgroundColor: 'rgba(var(--bg-color), 0.5)' },
  exited: { opacity: 0, backgroundColor: 'rgba(var(--bg-color), 0.5)' },
}

const DynamicCover = ({ cover, visible, className }) => {
  const coverImage = getImage(cover)
  return (
    <Transition in={visible} timeout={1000}>
      {(state) => (
        <BackgroundImage style={transitionStyles[state]} className={className}>
          {coverImage && (
            <GatsbyImage
              alt="background image"
              role="presentation"
              image={coverImage}
            />
          )}
        </BackgroundImage>
      )}
    </Transition>
  )
}

export default DynamicCover
