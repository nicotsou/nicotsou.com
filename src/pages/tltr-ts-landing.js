import { Link } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import Footer from '../components/Layout/Footer'
import Seo from '../components/seo'
import BlogStyles from '../styles/BlogStyles'
import { Aside1Styles } from '../styles/Typography'
import courseThumbImage from '../../content/assets/tltr-ts-thumb.jpg'
import NotifyPrompt from '../components/tltr-typescript/NotifyPrompt'
import Hero from '../components/tltr-typescript/Hero'

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

const LinksPage = () => {
  return (
    <main>
      <GlobalStyleModifier />
      <Seo
        title="TLTR; TypeScript Course"
        image={courseThumbImage}
        description="A course for JavaScript developers who seek to master type checking with TypeScript. Created by Nicos Tsourektsidis."
      >
        <link rel="stylesheet" href="https://use.typekit.net/fnw5vds.css" />
      </Seo>

      <Hero />

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
          <p>Feeling overwhelmed by all the possibilities? </p>
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
