import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import Footer from '../../../components/Layout/Footer'
import Seo from '../../../components/seo'
import BlogStyles from '../../../styles/BlogStyles'
import { Heading1, Label2 } from '../../../styles/Typography'
import courseThumbImage from '../../../../content/assets/tltr-ts-thumb.jpg'
import { graphql } from 'gatsby'
import Header from '../../../components/Layout/Header'
import AuthorAside from '../../../components/Layout/AuthorAside'
import PostList from '../../../components/PostList'
import PostItem from '../../../components/PostItem'
import groupBy from 'lodash/groupBy'
import shape1 from '../../../images/landing/shape-1.png'
import shape3 from '../../../images/landing/shape-3.png'
import shape6 from '../../../images/landing/shape-6.png'
import DynamicCover from '../../../components/DynamicCover'
import { useState } from 'react'

const mapShapesToModules = [shape1, shape6, shape3]

const GlobalStyleModifier = createGlobalStyle`
  :root {
    body {
       // Page color adjustments
      --text-color: var(--white-value);
      --bg-color: var(--tltr-black-value);
      --caption-color: var(--white-value);
    }

  }
`
const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: linear-gradient(
    rgba(var(--tltr-blue-value), 1) 0%,
    rgba(var(--tltr-blue-value), 0.5) 50%,
    rgb(var(--bg-color)) 70%
  );
  background-position: center;
  background-repeat: no-repeat;
`

const StyledDynamicCover = styled(DynamicCover)`
  filter: grayscale(1) opacity(0.6) brightness(0.8) contrast(1.1);
  mix-blend-mode: overlay;
  position: absolute;
`

const Article = styled.article`
  margin-top: clamp(0.5rem, 10vh, 9.5rem);
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

  ul {
    padding: 0;
    margin: 0;
  }
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
  margin-bottom: 0;
`

const Section = styled.section`
  ${SectionStyles}
`

const Modules = styled.div`
  @media screen and (min-width: 780px) {
    display: grid;
    margin-top: 6rem;
    grid-template-columns: 1fr 1fr;
  }
`

const Module = styled.div`
  margin: 0 5rem 7rem;
  position: relative;

  &:hover {
    img {
      animation: spin 10s infinite;
    }
  }

  @media screen and (min-width: 780px) {
    margin: 0 3rem 5rem 3rem;

    &:nth-child(even) {
      grid-column: 2 / 4;
    }

    &:nth-child(odd) {
      grid-column: 1 / 4;
    }
  }
`

const ModuleImage = styled.img`
  display: block;
  position: absolute;
  width: 150px;
  height: auto;
  top: -50px;
  left: -80px;
  z-index: -1;
  mix-blend-mode: color-dodge;
  transition: transform 1s ease-in;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const LinksPage = ({ data }) => {
  const [highlightedPost, setHighlightedPost] = useState(null)
  const [isCoverVisible, setIsCoverVisible] = useState(false)

  const modules = groupBy(data.allMarkdownRemark.nodes, 'frontmatter.module')

  const handlePostHover = (post) => {
    post && setHighlightedPost(post)
    setIsCoverVisible(!!post)
  }

  return (
    <main>
      <GlobalStyleModifier />
      <Seo
        title="TLTR; TypeScript - Course content"
        image={courseThumbImage}
        description="A course for JavaScript developers who seek to master type checking with TypeScript. Created by Nicos Tsourektsidis."
      >
        <link rel="stylesheet" href="https://use.typekit.net/fnw5vds.css" />
      </Seo>
      <Bg>
        <StyledDynamicCover
          visible={isCoverVisible}
          cover={highlightedPost?.frontmatter?.cover}
        />
      </Bg>

      <Header breadcrumb="Courses" />
      <Article
        itemScope
        className="blog-post"
        itemType="http://schema.org/Article"
      >
        <Section>
          <header>
            <Label2>Course Content</Label2>
            <StyledHeading1 itemProp="headline">
              TLTR; TypeScript
            </StyledHeading1>
          </header>
        </Section>

        <Article className="blog-post">
          <ArticleSection>
            <Modules>
              {Object.keys(modules).map((moduleName, index) => (
                <Module key={moduleName}>
                  <ModuleImage
                    src={mapShapesToModules[index % 3]}
                    role="presentation"
                    aria-hidden="true"
                  />
                  <Label2>{moduleName}</Label2>
                  <PostList onMouseLeave={() => handlePostHover(null)}>
                    {modules[moduleName].map((node, index) => (
                      <PostItem
                        key={index}
                        to={`/courses/tltr-typescript${node.fields.slug}`}
                        onLinkHover={() => handlePostHover(node)}
                      >
                        {node.frontmatter.title}
                      </PostItem>
                    ))}
                  </PostList>
                </Module>
              ))}
            </Modules>
          </ArticleSection>
        </Article>

        <Section>
          <AuthorAside>
            Hey, Thank you so much for checking out my course. It's still work
            in progress.{' '}
            <a
              href="https://twitter.com/nicotsou"
              target="_blank"
              rel="noreferrer"
            >
              Share
            </a>{' '}
            your thoughts about it.
          </AuthorAside>
        </Section>
      </Article>
      <br />
      <br />
      <StyledFooter />
    </main>
  )
}

export default LinksPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "course" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          quote
          module
          cover {
            publicURL
            childImageSharp {
              gatsbyImageData(width: 1200, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
