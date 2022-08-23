import { Link } from 'gatsby'
import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import Footer from '../components/Layout/Footer'
import Seo from '../components/seo'
import cover from '../images/tltr-ts-cover.jpg'
import BlogStyles from '../styles/BlogStyles'
import { Aside1Styles } from '../styles/Typography'
import NotifyPrompt from './components/NotifyPrompt'

const GlobalStyleModifier = createGlobalStyle`
  :root {
    // TLTR Brand Colors
    --tltr-blue-value: 22, 7, 138;
    --tltr-black-value: 2, 5, 23;
    
    // Page color adjustments
    --text-color: var(--white-value);
    --bg-color: var(--tltr-blue-value);
    --caption-color: var(--white-value);
  }
`

const StyledH1 = styled.h1`
  margin: 0;
  padding: 0;
`

const Article = styled.article`
  margin-bottom: 9rem;
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
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const HeroImage = styled.img`
  width: 100%;
`

const Aside = styled.span`
  ${Aside1Styles}
  display: block;
  padding-right: 3rem;
  margin: 5rem 0;
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
      <Seo title="TLTR; TypeScript Course" />
      <StyledH1>
        <HeroImage alt="TLTR; TypeScript Logo" aria-hidden="true" src={cover} />
      </StyledH1>
      <Article className="blog-post">
        <ArticleSection>
          <NotifyPrompt />
          <p>
            <Aside>
              A course for JavaScript engineers, to help you master{' '}
              <ErrorHighlighter>type checking</ErrorHighlighter>.
              <Author>
                Designed by <Link to="/">Nicos Tsourektsidis</Link>
              </Author>
            </Aside>
          </p>

          <p>
            The complexity of modern applications demands better development
            tools. TypeScript is by far the{' '}
            <a
              href="https://2021.stateofjs.com/en-US/other-tools/#javascript_flavors"
              target="_blank"
            >
              most popular
            </a>{' '}
            way of having types in JavaScript. In fact,{' '}
            <strong>
              developers prefer to learn TypeScript over JavaScript
            </strong>
            .
          </p>
          <p>JavaScript never had types.</p>
          <p>
            We used to be the rebels. Now types are in every project. Switching
            your mindset takes time. Adding types to a language that hasn't made
            for them is also a trivial challenge. Thankfully, TypeScript
            developers have found a practical way.
          </p>
          <p>
            Ah, and <strong>adding types is only the beginning.</strong> Every
            new tool you introduce in your codebase comes with its own
            surprises. What’s the best way of structuring your codebase with
            TypeScript? Are you repeating yourself? How can you help your team
            improve their code?
          </p>
          <p>No it's not easy. </p>
          <p>But there is a better way.</p>
          <blockquote>
            <p>
              Let’s make TypeScript{' '}
              <strong>
                <em>fun</em>
              </strong>{' '}
              again!
            </p>
          </blockquote>
          <p>
            This course was designed from the ground up. Video tutorials with
            their associated references, useful articles, coding challenges, fun
            facts, cheatsheets, quizzes, and more surprises are coming along the
            way. Everything you need to{' '}
            <strong>💥 triumph on that tech interview</strong>.
          </p>
          <p>
            This course will teach you what you need to know to{' '}
            <strong>get comfortable working with types 😎</strong>. It starts
            with the very basics, explaining how TypeScript works. We will
            review fundamental JavaScript features and quirks that will help you
            increase code quality.
          </p>
          <p>
            We will discover advanced TypeScript features that will help you
            structure your applications in ways you never imagined. Your way to{' '}
            <strong>become a TypeScript 🎖 expert in your team</strong>. I will
            explain my mental model to help you understand the different types
            and the meaning behind them.
          </p>
          <p>
            I will give you my best practices to help you incorporate TypeScript
            in your existing or new applications. This will help you make the
            right choices and move more efficiently. My goal is to help you{' '}
            <strong>🧑🏿‍💻 become a better engineer</strong>.
          </p>
          <h3>Contribute</h3>
          <p>
            The full contents of this course will be{' '}
            <strong>
              <em>open source</em>
            </strong>
            . Feel free to comment, suggest changes via pull requests, and share
            your feedback to make this course <strong> 🤩 awesome</strong>!
          </p>

          <hr />
          <h2>Get free access!</h2>
          <p>
            The course is ✍️ <i>work in progress</i>. I will announce it soon.
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
