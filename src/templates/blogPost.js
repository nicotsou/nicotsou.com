import React from 'react'
import { graphql, Link } from 'gatsby'
import Header from '../components/Layout/Header'
import { Body2, Label2 } from '../styles/Typography'
import { Helmet } from 'react-helmet'
import BlogStyles from '../styles/BlogStyles'
import Footer from '../components/Layout/Footer'
import AuthorAside from '../components/Layout/AuthorAside'
import styled from 'styled-components'
import CodeHighlighter from '../styles/CodeHighlighter'

const ArticleList = styled.ul`
  && {
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
`
const BlogPage = styled.main`
  margin: 0 auto;
  margin-top: clamp(1rem, calc(100vh * 20 / 100), 9.5rem);
  max-width: 640px;
  padding: 0 1rem;

  @media screen and (min-width: 780px) {
    max-width: 750px;
  }
`

const Post = styled.article`
  ${BlogStyles}
`

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      />
      <Header />
      <BlogPage>
        <CodeHighlighter />
        <Post
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <Label2>{post.frontmatter.date}</Label2>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr />
        </Post>
        <AuthorAside />
        <nav>
          <ArticleList>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  <Body2>← {previous.frontmatter.title}</Body2>
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  <Body2>{next.frontmatter.title} →</Body2>
                </Link>
              )}
            </li>
          </ArticleList>
        </nav>
        <Footer />
      </BlogPage>
    </>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
