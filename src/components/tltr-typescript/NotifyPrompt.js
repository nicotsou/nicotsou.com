import React from 'react'
import styled from 'styled-components'
import { Label2Styles } from '../../styles/Typography'

const StyledLink = styled.a`
  border: 2px solid rgb(var(--white-value));
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.5s ease-in;
  display: inline-block;

  &:visited {
    background: transparent;
    text-decoration: none;
  }

  &:focus {
    outline-color: var(--white-value);
    background: rgba(var(--white-value), 0.3);
  }

  &:hover {
    text-decoration: none;
    background-color: rgb(var(--white-value));
    color: rgb(var(--tltr-blue-value));
    transition: background-color 0.1s ease-out;
  }
`

const StyledDisclaimer = styled.span`
  display: block;
  margin: 1rem;

  @media screen and (min-width: 780px) {
    display: inline-block;
    margin: auto auto auto 2rem;
  }
`

const LaunchText = styled.span`
  ${Label2Styles}
  color: rgba(var(--caption-color), 0.8);
`

const NotifyPrompt = () => {
  return (
    <center>
      <StyledLink href="https://nicotsou.gumroad.com/l/TLTR-typescript">
        Enroll now
      </StyledLink>
      <StyledDisclaimer>
        <LaunchText>Work in 🚜 progress.</LaunchText>
      </StyledDisclaimer>
    </center>
  )
}

export default NotifyPrompt
