import React from 'react'
import Header from '../components/Layout/Header'
import { Heading1, Label2 } from '../styles/Typography'
import BlogStyles from '../styles/BlogStyles'
import Footer from '../components/Layout/Footer'
import Avatar from '../components/Layout/Avatar'
import styled, { css } from 'styled-components'
import Seo from '../components/seo'
import courseThumbImage from '../../content/assets/tltr-ts-thumb.jpg'
import SignUp from '../components/SignUp'

const Article = styled.article`
  margin-top: clamp(0.5rem, 10vh, 9.5rem);
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
  margin-bottom: 0;
`

const SectionStyles = css`
  margin: 0 auto;
  max-width: 640px;
  padding: 0 1rem;

  @media screen and (min-width: 780px) {
    max-width: 750px;
  }
`

const ArticleSection = styled.section`
  ${BlogStyles}
  ${SectionStyles}
  margin-bottom: 6rem;
`

const Section = styled.section`
  ${SectionStyles}
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const StyledAvatar = styled(Avatar)`
  width: 7rem;
  height: 7rem;
`

const StyledHeader = styled.header`
  margin-bottom: 2rem;
`

const About = () => {
  return (
    <main>
      <Seo
        title="About me"
        image={courseThumbImage}
        description="Nicos Tsourektsidis about page"
      />
      <Header breadcrumb="About" />
      <Article
        itemScope
        className="blog-post"
        itemType="http://schema.org/Article"
      >
        <Section>
          <StyledHeader>
            <StyledAvatar />
            <StyledHeading1 itemProp="headline">
              Hey there, it's Nicos here 👋
            </StyledHeading1>
            <Label2>Nicos Tsourektsidis - @Nicotsou</Label2>
          </StyledHeader>
        </Section>

        <ArticleSection>
          <p>Here's what you need to know about me.</p>
          <p>
            I’m a developer/architect/tech lead. I create content to share what
            I'm learning with the world. I write on this blog, and I have a{' '}
            <a target="_blank" href="https://youtube.com/@nicotsou">
              YouTube channel
            </a>{' '}
            📺.
          </p>
          <p>
            I grew up in{' '}
            <a target="_blank" href="https://goo.gl/maps/6XkH6PtxpgsJGtdt7">
              Thessaloniki
            </a>{' '}
            🇬🇷, and now I live in{' '}
            <a href="/fun-facts-about-switzerland-part-i/">Zurich</a> 🇨🇭. I work
            as a Lead Software Engineer at{' '}
            <a target="_blank" href="https://www.epam.com">
              EPAM
            </a>{' '}
            in Zurich.
          </p>
          <p>
            I specialize in front-end development. It bridges my two passions;
            technology and design. Creating the user experiences of your dreams
            is an immensely satisfying process. The learning journey, although
            challenging at first, can be incredibly enjoyable. I strongly
            believe that following your passion can{' '}
            <a href="https://nicotsou.com/why-I-became-a-software-engineer/">
              transform your career
            </a>{' '}
            in ways you’ll never imagine.
          </p>
          <p>
            My job gave me the opportunity to try different projects and roles.
            From building solutions for large-scale client applications in the
            finance/ travel/ communications sectors to leading teams by enabling
            creative collaboration and establishing agile principles.
          </p>

          <p>
            I had the chance to work with companies such as UBS, British
            Telecom, Qatar Airways, and RE/MAX. Formerly, I worked for small to
            medium companies specializing in marketing, advertising, and web
            development. I have the experience of working as a freelancer and
            also attempted to build a startup.
          </p>
          <p>
            I love teaching stuff. I’m actively involved in organizing React
            Bootcamps where I contribute as a trainer. I recently published my
            first course about{' '}
            <a href="https://tltr-typescript.com">TypeScript</a>.
          </p>
          <p>Let’s build something great today.</p>
          <p>
            What’s on your mind? You could drop me an{' '}
            <a href="mailto:hello@nicotsou.com">email</a> about it.
          </p>
        </ArticleSection>
        <Section>
          <SignUp />
        </Section>
      </Article>
      <StyledFooter />
    </main>
  )
}

export default About
