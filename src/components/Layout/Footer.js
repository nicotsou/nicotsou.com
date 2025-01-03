import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import XIcon from '../../images/x.svg'
import YouTubeIcon from '../../images/youtube.svg'
import GithubIcon from '../../images/github.svg'
import { Label3 } from '../../styles/Typography'
import { graphql, useStaticQuery } from 'gatsby'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1rem;
  min-height: calc(100vh * 20 / 100);
`

const SocialList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  > li {
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

const Copyright = styled(Label3)`
  line-height: 2rem;
  text-transform: none;
`

const Footer = ({ className }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitter
            youtube
            github
          }
        }
      }
    }
  `)
  const social = data?.site?.siteMetadata?.social
  const { twitter, youtube, github } = social

  return (
    <StyledFooter className={className}>
      <SocialList>
        <li>
          <a
            href={`https://www.youtube.com/user/${youtube}`}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <Icon>
              <YouTubeIcon />
            </Icon>
          </a>
        </li>
        <li>
          <a
            href={`https://x.com/${twitter}`}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            <Icon>
              <XIcon />
            </Icon>
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noreferrer"
            aria-label="github"
          >
            <Icon>
              <GithubIcon />
            </Icon>
          </a>
        </li>
      </SocialList>
      <Copyright>&copy; 2024 NT</Copyright>
    </StyledFooter>
  )
}

export default Footer
