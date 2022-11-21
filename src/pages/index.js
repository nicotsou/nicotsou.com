import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Footer from '../components/Layout/Footer'
import { Aside1, Label1 } from '../styles/Typography'
import Logo from '../components/Layout/Logo'
import PostList from '../components/PostList'
import Seo from '../components/seo'
import DynamicCover from '../components/DynamicCover'
import PostItem from '../components/PostItem'

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
  > span {
    white-space: nowrap;
  }
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
      <Seo title="Nicos Tsourektsidis" />
      <DynamicCover
        visible={isCoverVisible}
        cover={highlightedPost?.frontmatter?.cover}
      />
      <StyledLogo />
      <StyledAside1>{quote}</StyledAside1>
      <StyledLabel1 as="h1">
        Nicos Tsourektsidis, Front-end developer.{' '}
        <span>Based in Zurich, CH</span>
      </StyledLabel1>
      <PostList onMouseLeave={() => handlePostHover(null)}>
        {data.allMarkdownRemark.nodes.map((node, index) => (
          <PostItem
            key={index}
            onLinkHover={() => handlePostHover(node)}
            to={node.fields.slug}
          >
            {node.frontmatter.title}
          </PostItem>
        ))}
      </PostList>
      <Footer />
    </Main>
  )
}

export default IndexPage

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "post"}}}
    sort: {frontmatter: {date: DESC}}
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
}`
