import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import Footer from '../components/Layout/Footer'
import { Heading1 } from '../styles/Typography'
import PostList from '../components/PostList'
import Seo from '../components/seo'
import DynamicCover from '../components/DynamicCover'
import PostItem from '../components/PostItem'
import Header from '../components/Layout/Header'

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
          <PostList onMouseLeave={() => handlePostHover(null)}>
            {data.allMarkdownRemark.nodes.map((node, index) => {
              console.log(`talks${node.fields.slug}`)
              return (
                <PostItem
                  key={index}
                  onLinkHover={() => handlePostHover(node)}
                  to={`/talks${node.fields.slug}`}
                >
                  {node.frontmatter.title}
                </PostItem>
              )
            })}
          </PostList>
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
