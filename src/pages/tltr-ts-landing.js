import { Link } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import Footer from '../components/Layout/Footer'
import Seo from '../components/seo'
import BlogStyles from '../styles/BlogStyles'
import { ProximaFont, TltrFont } from '../styles/LandingTypography'
import { Aside1Styles } from '../styles/Typography'
import NotifyPrompt from './components/NotifyPrompt'
import shape1 from '../images/landing/shape-1.png'
import shape2 from '../images/landing/shape-2.png'
import shape3 from '../images/landing/shape-3.png'
import shape4 from '../images/landing/shape-4.png'
import shape5 from '../images/landing/shape-5.png'
import shape6 from '../images/landing/shape-6.png'
import shape7 from '../images/landing/shape-7.png'
import shape8 from '../images/landing/shape-8.png'
import shape9 from '../images/landing/shape-9.png'

const GlobalStyleModifier = createGlobalStyle`
  :root {
    // TLTR Brand Colors
    --tltr-blue-value: 22, 7, 138;
    --tltr-black-value: 2, 5, 23;
    --tltr-awesome-value: 255, 26, 107;
    
    // Page color adjustments
    --text-color: var(--white-value);
    --bg-color: var(--tltr-blue-value);
    --caption-color: var(--white-value);
  }
`

const Article = styled.article`
  margin-bottom: 9rem;
`

const SectionStyles = css`
  margin: 0 auto;
  max-width: 640px;
  padding: 0 1rem;

  @media screen and (min-width: 780px) {
    max-width: 990px;
    box-sizing: border-box;
  }
`

const ArticleSection = styled.section`
  ${BlogStyles}
  ${SectionStyles}
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const Hero = styled.div`
  ${SectionStyles}
  height: 73vh;
  min-height: 700px;
  width: 100vw;
  padding: 0;
`

const HeroDescription = styled.div`
  margin-top: 3rem;

  @media screen and (min-width: 780px) {
    max-width: 80%;
  }
`

const Aside = styled.span`
  ${Aside1Styles}
  display: block;
  padding-right: 0;
  font-size: 1.6rem;
  margin: 0 0 5rem 2rem;
  max-width: 95%;

  @media screen and (min-width: 780px) {
    margin-left: 3rem;
    font-size: 1.8rem;
    max-width: 70%;
    margin-top: 2rem;
  }
`

const Author = styled.small`
  margin-top: 1.5rem;
  display: block;

  > a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
const ErrorHighlighter = styled.span`
  background: url(/error-highlighter.svg) repeat-x 0 100%;
  background-size: 12px;
  padding-bottom: 0.15rem;
`

const Title = styled.h1`
  padding-top: calc(180 / 1060 * 100vh);
  margin-left: 3rem;

  @media screen and (min-width: 780px) {
    padding-top: calc(270 / 1060 * 100vh);
    margin-left: 3rem;
  }
`

const Tltr = styled.span`
  ${TltrFont}
  font-size: 1.8rem;
  line-height: 1.8rem;
  font-size: clamp(0.5rem, 8vw, 2.8rem);
  line-height: clamp(0.5rem, 8vw, 2.8rem);
  display: block;
  color: rgb(var(--tltr-awesome-value));
  background: rgb(var(--tltr-awesome-value));
  background: linear-gradient(
    180deg,
    rgba(var(--tltr-awesome-value), 1) 50%,
    rgba(142, 0, 51, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

const CourseName = styled.span`
  ${ProximaFont}
  font-size: clamp(3rem, 15vw, 7rem);
  line-height: clamp(3rem, 15vw, 7rem);
  color: rgb(var(--white-value));
  background: rgb(var(--text-value));
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 40%,
    rgba(128, 128, 128, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

const HeroFrame = styled.div`
  background: rgb(var(--tltr-black-value));
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  min-height: 890px;
  top: 0;
  left: 0;
  z-index: -1;
`

const BackgroundCircle = styled.div`
  background: rgb(var(--tltr-blue-value));
  width: 403vw;
  height: 100vh;
  top: 64vh;
  left: -145%;
  border-radius: 100%;
  border-radius: 100%;
  position: absolute;

  @media screen and (min-width: 780px) {
    width: 303vw;
    left: -100%;
    top: 69%;
  }
`

const Shape = css`
  display: block;
  position: absolute;
  top: calc(var(--hero-shape-top) / 1250 * 100%);
  left: calc(var(--hero-shape-left) / 1920 * 100vw);
  width: calc(var(--hero-shape-width) / 1920 * 100vw);
`

const Shape1 = styled.img`
  ${Shape}
  --hero-shape-width: 350;
  --hero-shape-top: 35;
  --hero-shape-left: 1080;
`
const Shape2 = styled.img`
  ${Shape}
  --hero-shape-width: 235;
  --hero-shape-top: 265;
  --hero-shape-left: 1650;
`
const Shape3 = styled.img`
  ${Shape}
  --hero-shape-width: 155;
  --hero-shape-top: 415;
  --hero-shape-left: 1447;
`
const Shape4 = styled.img`
  ${Shape}
  --hero-shape-width: 160;
  --hero-shape-top: 671;
  --hero-shape-left: 1260;
`
const Shape5 = styled.img`
  ${Shape}
  --hero-shape-width: 430;
  --hero-shape-top: 595;
  --hero-shape-left: 1600;
`
const Shape6 = styled.img`
  ${Shape}
  --hero-shape-width: 150;
  --hero-shape-top: 770;
  --hero-shape-left: 590;
`
const Shape7 = styled.img`
  ${Shape}
  --hero-shape-width: 315;
  --hero-shape-top: 730;
  --hero-shape-left: 30;
`
const Shape8 = styled.img`
  ${Shape}
  --hero-shape-width: 300;
  --hero-shape-top: 60;
  --hero-shape-left: 100;
`
const Shape9 = styled.img`
  ${Shape}
  --hero-shape-width: 160;
  --hero-shape-top: 158;
  --hero-shape-left: 770;
`

const LinksPage = () => {
  return (
    <main>
      <GlobalStyleModifier />
      <Seo title="TLTR; TypeScript Course">
        <link rel="stylesheet" href="https://use.typekit.net/fnw5vds.css" />
      </Seo>

      <Hero>
        <HeroFrame>
          <BackgroundCircle />
          <Shape1 src={shape1} role="presentation" aria-hidden="true" />
          <Shape2 src={shape2} role="presentation" aria-hidden="true" />
          <Shape3 src={shape3} role="presentation" aria-hidden="true" />
          <Shape4 src={shape4} role="presentation" aria-hidden="true" />
          <Shape5 src={shape5} role="presentation" aria-hidden="true" />
          <Shape6 src={shape6} role="presentation" aria-hidden="true" />
          <Shape7 src={shape7} role="presentation" aria-hidden="true" />
          <Shape8 src={shape8} role="presentation" aria-hidden="true" />
          <Shape9 src={shape9} role="presentation" aria-hidden="true" />
        </HeroFrame>
        <Title>
          <Tltr>TLTR;</Tltr>
          <CourseName>TypeScript</CourseName>
        </Title>
        <HeroDescription>
          <NotifyPrompt />
        </HeroDescription>
      </Hero>

      <Article className="blog-post">
        <ArticleSection>
          <Aside>
            A course for JavaScript developers who seek to master{' '}
            <ErrorHighlighter>type checking</ErrorHighlighter>.
            <Author>
              Created by <Link to="/">Nicos Tsourektsidis</Link>
            </Author>
          </Aside>
          <p>
            The complexity of modern applications demands better development
            tools. <strong>Static typing</strong> adds a lot of confidence to
            build large scale single page applications.
          </p>
          <p>
            TypeScript is by far the{' '}
            <a href="https://2021.stateofjs.com/en-US/other-tools/#javascript_flavors">
              most popular
            </a>{' '}
            way of having types in JavaScript. In stark contrast to older
            solutions, you can choose to use your favorite tools and libraries.
            In fact,{' '}
            <strong>
              developers prefer to learn TypeScript over JavaScript
            </strong>
            .
          </p>
          <p>JavaScript never had types.</p>
          <p>
            Switching your mindset takes time. Adding types to a language that
            hasn't been built with strict types is challenging. Thankfully,
            TypeScript developers have found a practical way.
          </p>
          <p>
            Ah, and <strong>adding types is only the beginning.</strong> There
            are several other aspects. What’s the best way of structuring your
            codebase with TypeScript? Are you repeating yourself? How can you
            help your team improve their code?
          </p>
          <p>Feeling overwhelmed by all the posibilities? </p>
          <p>No need to...</p>
          <blockquote>
            <p>
              Let’s make TypeScript{' '}
              <strong>
                <em>fun</em>
              </strong>
              !
            </p>
          </blockquote>
          <p>
            This course is being designed from the ground up. I'm putting a lot
            of effort to present it as efficient as possible. It will contain
            video tutorials with their associated references, useful articles,
            coding challenges, fun facts, cheatsheets, quizzes, and more
            surprises are coming along the way. Everything you need to{' '}
            <strong>💥 triumph during your tech interview</strong>.
          </p>
          <p>
            <strong>Get comfortable working with types 😎</strong>. We'll start
            with the very basics, learning how TypeScript works. You will launch
            your first application from the very beginning. We will review
            fundamental JavaScript features and quirks that will help you
            increase code quality. Choose what you want to learn based on your
            experience and seniority.
          </p>
          <p>
            We will discover advanced TypeScript features that will help you
            structure your applications in ways you never imagined. Your way to{' '}
            <strong>become a TypeScript 🎖 expert in your team</strong>. I will
            explain my mental model to help you understand the different types
            and the meaning behind them.
          </p>
          <p>
            Learn best practices to incorporate TypeScript in your existing or
            new applications. This will help you make the right choices and move
            more efficiently. Discover common pitfalls and misconceptions. My
            goal is to help you <strong>🧑🏿‍💻 become a better engineer</strong>.
          </p>

          <hr />
          <h2>Get free access!</h2>
          <p>
            The course is ✍️ <i>work in progress</i>.
          </p>
          <p>
            Subscribe to my newsletter and you will be the first who will access
            it for free.
          </p>
          <br />
          <br />
          <NotifyPrompt />
        </ArticleSection>
      </Article>

      <StyledFooter />
    </main>
  )
}

export default LinksPage
