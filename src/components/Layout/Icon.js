import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.div`
  display: inline;
  width: 2rem;
  height: auto;
  line-height: 1rem;
  text-align: center;

  svg {
    height: auto;
    .stroke {
      stroke: rgb(var(--text-color));
    }

    .fillable {
      fill: rgb(var(--text-color));
    }
  }
`

const Icon = ({ children }) => {
  return <StyledIcon>{children}</StyledIcon>
}

export default Icon
