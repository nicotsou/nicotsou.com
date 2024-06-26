import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
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
  --text-color: var(--light-sea-green-value);
  --caption-color: var(--light-sea-green-value);
  color: rgb(var(--light-sea-green-value));
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

const NotFoundPage = ({ data }) => {
  const [highlightedPost, setHighlightedPost] = React.useState(null)
  const [isCoverVisible, setIsCoverVisible] = useState(false)

  const handlePostHover = (post) => {
    post && setHighlightedPost(post)
    setIsCoverVisible(!!post)
  }

  return (
    <Main>
      <Seo title="404: Not Found" />
      <DynamicCover
        visible={isCoverVisible}
        cover={highlightedPost?.frontmatter?.cover}
      />
      <Link to="/">
        <StyledLogo />
      </Link>
      <StyledAside1>
        It looks like you have your 404 moment here. All the other 403 tests
        passed.
      </StyledAside1>
      <StyledLabel1 as="h1">
        The page you're looking for must be somewhere below.
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

export default NotFoundPage

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
