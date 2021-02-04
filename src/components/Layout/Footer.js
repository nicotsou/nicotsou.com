import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import TwitterIcon from '../../images/twitter.svg'
import MediumIcon from '../../images/medium.svg'
import GithubIcon from '../../images/github.svg'
import { Label3 } from '../../styles/Typography'
import { graphql, useStaticQuery } from 'gatsby'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: calc(100vh * 16 / 100);
`

const SocialList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  > li {
    padding: 0;
    display: inline-block;
    margin-right: 8px;

    &:first-child {
      margin-left: -8px;
    }

    a {
      &:hover {
        opacity: 0.5;
      }
    }
  }
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitter
            medium
            github
          }
        }
      }
    }
  `)
  const social = data?.site?.siteMetadata?.social
  const { twitter, medium, github } = social

  return (
    <StyledFooter>
      <SocialList>
        <li>
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <TwitterIcon />
            </Icon>
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/@${medium}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <MediumIcon />
            </Icon>
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/${github}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <GithubIcon />
            </Icon>
          </a>
        </li>
      </SocialList>
      <Label3>&copy; 2020 NT</Label3>
    </StyledFooter>
  )
}

export default Footer
