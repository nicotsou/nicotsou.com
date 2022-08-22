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

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    color: rgb(var(--text-color));
    text-decoration: none;
  }
`

const Header = ({ breadcrumb }) => {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo size={Logo.sizes.small} />
      </Link>
      <StyledLabel2>
        <StyledLink to="/">Nicos Tsourektsidis</StyledLink> \ {breadcrumb}
      </StyledLabel2>
    </StyledHeader>
  )
}

export default Header
