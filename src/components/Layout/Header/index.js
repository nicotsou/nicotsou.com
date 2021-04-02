import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Label2 } from '../../../styles/Typography'
import Logo from '../Logo'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 1250px;
  margin: 3rem auto;
  line-height: 2rem;
  padding: 0 1rem;

  @media screen and (min-width: 880px) {
    padding: 0 3rem;
  }
`

const StyledLabel2 = styled(Label2)`
  flex-grow: 1;
  text-align: center;
  line-height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 1rem;
  white-space: nowrap;
`

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo size={Logo.sizes.small} />
      </Link>
      <StyledLabel2>Nicos Tsourektsidis \ Blog</StyledLabel2>
    </StyledHeader>
  )
}

export default Header
