import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledListItem = styled.li`
  margin-top: 1rem;
  max-width: 20rem;
`

const PostLink = styled(Link)`
  font-family: 'Merriweather', serif;
  font-size: 1.25rem;
  line-height: 2.1rem;
  letter-spacing: -0.0055rem;
  font-weight: 300;
  text-decoration: none;
`

const PostItem = ({ to, children, onLinkHover }) => {
  return (
    <StyledListItem>
      <PostLink to={to} onMouseEnter={onLinkHover}>
        {children}
      </PostLink>
    </StyledListItem>
  )
}

export default PostItem
