import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Heading3Styles } from '../styles/Typography'

const StyledListItem = styled.li`
  margin-bottom: 1rem;
  max-width: 20rem;
`

const PostLink = styled(Link)`
  ${Heading3Styles}
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
