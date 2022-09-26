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
            tools. Static typing <strong>builds 💪 confidence</strong> and helps
            you <strong>scale 📈 your applications</strong>.
          </p>
          <p>
            TypeScript is by far the{' '}
            <a href="https://2021.stateofjs.com/en-US/other-tools/#javascript_flavors">
              most popular
            </a>{' '}
            way of having types in JavaScript. In fact,{' '}
            <strong>
              developers prefer to learn TypeScript over JavaScript
            </strong>
            .
          </p>
          <p>
            It took me a lot of time to properly learn TypeScript. I was never
            expecting it would have been so complicated. I've been working with
            JavaScript for years. I've been using types in other languages. And
            still it wasn't a straightforward process for me. You see...
          </p>
          <blockquote>
            <p>JavaScript never had strict types.</p>
          </blockquote>
          <p>
            <strong>Shifting your mindset takes ⏳ time</strong>. Your codebase
            changes. The way you're writing code changes. Compiler{' '}
            <ErrorHighlighter>errors</ErrorHighlighter> will become your next
            best friends.
          </p>
          <p>Been there. Done that.</p>
          <p>Ah, and adding types is only the beginning.</p>
          <p>
            Even if you are familiar with static typing languages,{' '}
            <strong>TypeScript is a different kind of 🍇 fruit</strong>. You can
            dynamically generate your types.
          </p>
          <p>
            In fact, if you are repeating your type annotations in multiple
            files, you're probably doing something wrong.
          </p>
          <p>
            And it's hard to make design decisions. What is the right keyword to
            use? What is the proper way to structure your code? Will my code
            scale or I waste my time?
          </p>
          <p>
            I found myself spending an enormous amount of time studying
            TypeScript; books, videos, tutorials, documentation pages, chats
            with friends, code reviews...
          </p>
          <p>You don't have to go that far!</p>
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
            I designed this course from the ground up. With 📺{' '}
            <strong>video tutorials</strong>, 📑 <strong>articles</strong>, 💻{' '}
            <strong>coding challenges</strong>, and more 💎{' '}
            <strong>surprises</strong> are coming along the way. Pretty soon you
            will find <strong>🎒 workshops</strong> to help you practice what
            you're learning. Basically everything you need to{' '}
            <strong>triumph during your 😎 tech interview</strong>.
          </p>
          <p>
            <strong>It targets all levels;</strong> From juniors to leads. Just
            choose what you want to study first. We'll start with the basics,
            reviewing fundamental JavaScript quirky behaviors. I'll teach you
            how to avoid them by using TypeScript. Trust me, everything will
            make sense to you after watching that part of the course.
          </p>
          <p>
            Wouldn't be great if you were able to read and understand every
            TypeScript file? We'll get there! I will present you the most
            advanced TypeScript features. I will share my mental model to help
            you understand how everything is connected. You'll learn how to
            structure your apps in ways you never imagined. That's your ticket
            to <strong>become a TypeScript 🎖 Pro</strong>.
          </p>
          <p>
            At the end of this course you will learn how to apply best practices
            and make the right design decisions. It's our duty to{' '}
            <strong>write high 👌 quality code</strong>.
          </p>
          <p>
            Join me in this learning journey and{' '}
            <strong>become a better software 🧑🏿‍💻 engineer</strong>.
          </p>
          <br />
          <p>Nicos</p>

          <hr />

          <h3>Is this course ready?</h3>
          <p>
            The course is not yet completed. I’m releasing learning materials
            and platform features in short increments.
          </p>
          <p>
            I'm impatient by design; I wanted to share my course with everyone
            from the very beginning. That's why I'm launching this course far
            ahead of its completion.
          </p>
          <p>But that's a good thing!</p>
          <p>
            I'm a huge fan of agile and lean startup. Getting feedback at an
            early stage will help this course become better.
          </p>

          <h3>How to enroll?</h3>
          <p>
            You can <strong>pay as much as you want to enroll</strong>.
          </p>
          <p>
            I'm also launching a <strong>👑 Premium tier</strong> for people who
            want to support my work.
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
