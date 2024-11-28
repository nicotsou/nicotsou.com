import React from 'react'
import styled, { css } from 'styled-components'
import Footer from '../components/Layout/Footer'
import Seo from '../components/seo'
import Header from '../components/Layout/Header'
import links from '../../content/links/links.json'
import { Heading1 } from '../styles/Typography'

const Article = styled.article`
  margin-top: clamp(0.5rem, calc(100vh * 20 / 100), 9.5rem);
`

const SectionStyles = css`
  margin: 0 auto;
  max-width: 640px;
  padding: 0 1rem;

  @media screen and (min-width: 780px) {
    max-width: 750px;
  }
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
`

const List = styled.ul`
  list-style: none;
  margin-top: 5rem;
  margin-bottom: 6rem;
  padding: 0;
`

const ListItem = styled.li`
  margin-top: 1rem;
`

const StyledLink = styled.a`
  font-family: 'Merriweather', serif;
  font-size: 1.25rem;
  line-height: 2.1rem;
  letter-spacing: -0.0055rem;
  font-weight: 300;
  text-decoration: none;
`

const LinksPage = () => {
  const StyledFooter = styled(Footer)`
    ${SectionStyles}
  `

  const Section = styled.section`
    ${SectionStyles}
  `

  return (
    <main>
      <Seo title="Nicos Tsourektsidis \ Links" />
      <Header breadcrumb="Links" />

      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Section>
          <header>
            <StyledHeading1 itemProp="headline">Links</StyledHeading1>
          </header>
          <List>
            {links.map((link, index) => (
              <ListItem key={index}>
                <StyledLink href={link.url}>{link.title}</StyledLink>
              </ListItem>
            ))}
          </List>
        </Section>
      </Article>
      <StyledFooter />
    </main>
  )
}

export default LinksPage
