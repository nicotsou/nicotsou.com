import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  list-style: none;
  margin-top: 5rem;
  margin-bottom: 6rem;
  padding: 0;
`

const PostList = ({ children, onMouseLeave }) => {
  return <List onMouseLeave={onMouseLeave}>{children}</List>
}

export default PostList
