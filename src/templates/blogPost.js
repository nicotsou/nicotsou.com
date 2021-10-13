import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import Header from '../components/Layout/Header'
import { Body2, Heading1, Label2 } from '../styles/Typography'
import BlogStyles from '../styles/BlogStyles'
import Footer from '../components/Layout/Footer'
import AuthorAside from '../components/Layout/AuthorAside'
import styled, { css } from 'styled-components'
import CodeHighlighter from '../styles/CodeHighlighter'
import SEO from '../components/seo'

const Article = styled.article`
  margin-top: clamp(0.5rem, calc(100vh * 20 / 100), 9.5rem);
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
`

const Cover = styled.section`
  max-width: 1250px;
  margin: 2rem auto 4rem auto;
`

const StyledCoverImage = styled(Image)`
  transition: border-radius 0.3s linear;

  @media screen and (min-width: 1300px) {
    border-radius: calc(2.3 * 1rem);
  }
`

const SuggestedArticles = styled.ul`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
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

const Section = styled.section`
  ${SectionStyles}
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const BlogPostTemplate = ({ data, location }) => {
  const { html } = data?.markdownRemark
  const { title, date, description, cover } = data?.markdownRemark?.frontmatter
  const { previous, next } = data

  return (
    <main>
      <SEO title={title} image={cover.publicURL} description={description} />
      <Header />
      <CodeHighlighter />
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Section>
          <header>
            <Label2>{date}</Label2>
            <StyledHeading1 itemProp="headline">{title}</StyledHeading1>
          </header>
        </Section>
        <Cover>
          <StyledCoverImage
            alt={title}
            aria-hidden="true"
            style={{ width: '100%', minHeight: '67vh' }}
            fluid={cover?.childImageSharp?.fluid}
          />
        </Cover>

        <ArticleSection
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />

        <Section>
          <AuthorAside />
          <nav>
            <SuggestedArticles>
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
            </SuggestedArticles>
          </nav>
        </Section>
      </Article>
      <StyledFooter />
    </main>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1900) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
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
