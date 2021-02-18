import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Footer from '../components/Layout/Footer'
import { Aside1, Label1 } from '../styles/Typography'
import Logo from '../components/Layout/Logo'
import PostList from '../components/PostList'
import SEO from '../components/seo'
import DynamicCover from '../components/DynamicCover'

const Main = styled.main`
  margin: 0 auto;
  max-width: 700px;
  padding: 0 1rem;
`

const StyledLogo = styled(Logo)`
  margin-top: calc(100vh * 20 / 100);
`

const StyledAside1 = styled(Aside1)`
  margin-top: 3.85rem;
  max-width: 580px;
`

const StyledLabel1 = styled(Label1)`
  margin-top: 0.55rem;
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
    <Main>
      <SEO title="Nicos Tsourektsidis" />
      <DynamicCover
        visible={isCoverVisible}
        image={highlightedPost?.frontmatter?.cover?.childImageSharp?.fluid}
      />
      <StyledLogo />
      <StyledAside1>{quote}</StyledAside1>
      <StyledLabel1 as="h1">
        Nicos Tsourektsidis, Front-end developer. Based in Zurich, CH
      </StyledLabel1>
      <PostList onLinkHover={handlePostHover} />
      <Footer />
    </Main>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          quote
          cover {
            publicURL
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
