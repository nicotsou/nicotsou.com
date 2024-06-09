import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Body3, Label3 } from '../../styles/Typography'
import Divider from './Divider'
import Avatar from './Avatar'

const Aside = styled.aside`
  padding: 2rem 4rem 1rem 1rem;

  @media screen and (min-width: 320px) {
    display: flex;
  }
`

const StyledDivider = styled(Divider)`
  margin: 4rem 0 0 0;
`

const StyledAvatarLink = styled.a`
  flex-shrink: 0;
  display: block;
  width: 4rem;
`

const StyledAvatar = styled(Avatar)`
  margin-right: 1rem;
`

const StyledBody3 = styled(Body3)`
  margin-top: 1.35rem;

  @media screen and (min-width: 320px) {
    margin-top: 0;
  }
`

const StyledLabel3 = styled(Label3)`
  margin-top: 0.7rem;
`
const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default function AuthorAside({ children }) {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            bio
          }
          social {
            twitter
            medium
            github
          }
        }
      }
    }
  `)

  const author = data?.site?.siteMetadata?.author?.name

  return (
    <>
      <StyledDivider />
      <Aside>
        <StyledAvatarLink href="/about">
          <StyledAvatar />
        </StyledAvatarLink>
        <div>
          <StyledBody3>{children}</StyledBody3>
          <StyledLabel3>
            <StyledLink to="/about">{author}</StyledLink>
          </StyledLabel3>
        </div>
      </Aside>
    </>
  )
}
