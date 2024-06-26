import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { Body3, Label3 } from '../../styles/Typography'
import Divider from './Divider'

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

const Avatar = styled(GatsbyImage)`
  margin-right: 1rem;

  img {
    border-radius: 100%;
  }
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

export default function AuthorAside({ children }) {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 100, placeholder: BLURRED, quality: 95)
        }
      }
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

  const avatarImage = getImage(data?.avatar)
  const author = data?.site?.siteMetadata?.author?.name

  return (
    <>
      <StyledDivider />
      <Aside>
        <StyledAvatarLink
          href="https://x.com/nicotsou"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar alt="avatar" image={avatarImage} />
        </StyledAvatarLink>
        <div>
          <StyledBody3>{children}</StyledBody3>
          <StyledLabel3>{author}</StyledLabel3>
        </div>
      </Aside>
    </>
  )
}
