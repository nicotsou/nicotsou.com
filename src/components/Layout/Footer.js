import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import TwitterIcon from '../../images/twitter.svg'
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

const HashLink = styled.a`
  display: inline;
  color: #0057b7;
  text-decoration: none;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  letter-spacing: 0.04em;

  &:visited,
  &:active {
    color: #0057b7;
  }

  span {
    color: #e7c400;
  }

  @media (prefers-color-scheme: dark) {
    color: #2a8fff;

    &:visited,
    &:active {
      color: #2a8fff;
    }
  }
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
            href={`https://www.youtube.com/user/${youtube}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <YouTubeIcon />
            </Icon>
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon>
              <GithubIcon />
            </Icon>
          </a>
        </li>
      </SocialList>
      <Copyright>
        <HashLink href="https://u24.gov.ua" target="_blank">
          <span>#</span>prayforukraine
        </HashLink>{' '}
        - &copy; 2020-3 NT
      </Copyright>
    </StyledFooter>
  )
}

export default Footer
