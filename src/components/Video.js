import React from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const PlayerWrapper = styled.div`
  position: relative;
  margin: 3rem auto 4rem auto;

  // Responsive sizing
  width: 100vw;
  height: calc(100vw * 2048 / 4096);
  max-width: 1250px;
  max-height: 625px;
  /* padding-top: calc(100% / (2 / 0.725)); */

  // Rounded corners
  transition: border-radius 0.3s linear;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;

  @media screen and (min-width: 1300px) {
    border-radius: 2.3rem;
  }
`

const StyledReactPlayer = styled(ReactPlayer)`
  box-shadow: inset 0 0 5px white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`

function Video({ id }) {
  return (
    <PlayerWrapper>
      <StyledReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        controls
        pip
        stopOnUnmount
        config={{
          youtube: {
            playerVars: { showinfo: 0, modestbranding: 0, rel: 0 },
          },
        }}
        width="100%"
        height="100%"
      />
    </PlayerWrapper>
  )
}

export default Video
