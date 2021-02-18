import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
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

const Avatar = styled(Image)`
  flex-shrink: 0;
  display: block;
  border-radius: 100%;
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

export default function AuthorAside() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
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

  const avatar = data?.avatar?.childImageSharp?.fixed
  const author = data?.site?.siteMetadata?.author?.name
  const summary = data?.site?.siteMetadata?.author?.summary

  return (
    <>
      <StyledDivider />
      <Aside>
        <a href="https://twitter.com/nicotsou" target="_blank" rel="noreferrer">
          <Avatar fixed={avatar} />
        </a>
        <div>
          <StyledBody3>
            {summary}{' '}
            <a
              href="https://twitter.com/nicotsou"
              target="_blank"
              rel="noreferrer"
            >
              Follow my work on Twitter
            </a>
          </StyledBody3>
          <StyledLabel3>{author}</StyledLabel3>
        </div>
      </Aside>
    </>
  )
}
