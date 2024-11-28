import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import Footer from '../components/Layout/Footer'
import { Heading1, Label1, Label2 } from '../styles/Typography'
import PostList from '../components/PostList'
import Seo from '../components/seo'
import DynamicCover from '../components/DynamicCover'
import PostItem from '../components/PostItem'
import Header from '../components/Layout/Header'
import BlogStyles from '../styles/BlogStyles'

const Main = styled.main`
  margin: 0 auto;
  max-width: 700px;
  padding: 0 1rem;
`

const Article = styled.article`
  margin-top: clamp(0.5rem, calc(100vh * 20 / 100), 9.5rem);
  margin-bottom: 240px;
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
`

const SectionStyles = css`
  margin: 0 auto;
  max-width: 640px;
  padding: 0 1rem;

  @media screen and (min-width: 780px) {
    max-width: 750px;
  }
`

const Section = styled.section`
  ${SectionStyles}
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const ArticleSection = styled.section`
  ${BlogStyles}

  margin-bottom: 6rem;
`

const IndexPage = ({ data }) => {
  const [highlightedPost, setHighlightedPost] = useState(null)
  const [isCoverVisible, setIsCoverVisible] = useState(false)

  const handlePostHover = (post) => {
    post && setHighlightedPost(post)
    setIsCoverVisible(!!post)
  }

  const quote = data?.allMarkdownRemark?.nodes.find(
    (node) => node?.frontmatter?.quote
  )?.frontmatter?.quote

  const talksGroupedByYear = data.allMarkdownRemark.nodes.reduce(
    (acc, node) => {
      const year = new Date(node.frontmatter.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(node)
      return acc
    },
    {}
  )

  const years = Object.keys(talksGroupedByYear).sort((a, b) => b - a)

  return (
    <main>
      <Seo title="Nicos Tsourektsidis \ Talks" />
      <Header breadcrumb="Talks" />

      <DynamicCover
        visible={isCoverVisible}
        cover={highlightedPost?.frontmatter?.cover}
      />

      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Section>
          <header>
            <StyledHeading1 itemProp="headline">Talks</StyledHeading1>
          </header>

          <ArticleSection>
            <p>
              I occasionally give talks on a variety of topics, including
              Generative AI, Frontend Engineering, and Architectural Design.
            </p>
          </ArticleSection>

          {years.map((year) => (
            <div key={year}>
              <PostList onMouseLeave={() => handlePostHover(null)}>
                <Label2>{year}</Label2>
                {talksGroupedByYear[year].map((node, index) => (
                  <PostItem
                    key={index}
                    onLinkHover={() => handlePostHover(node)}
                    to={`/talks${node.fields.slug}`}
                  >
                    {node.frontmatter.title}
                  </PostItem>
                ))}
              </PostList>
            </div>
          ))}
        </Section>
      </Article>
      <StyledFooter />
    </main>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "talk" } } }
      sort: { frontmatter: { date: DESC } }
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
