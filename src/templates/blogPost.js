import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Header from '../components/Layout/Header'
import { Body2, Heading1, Label2 } from '../styles/Typography'
import BlogStyles from '../styles/BlogStyles'
import Footer from '../components/Layout/Footer'
import AuthorAside from '../components/Layout/AuthorAside'
import styled, { css } from 'styled-components'
import CodeHighlighter from '../styles/CodeHighlighter'
import Seo from '../components/seo'
import SignUp from '../components/SignUp'
import DynamicCover from '../components/DynamicCover'
import { useState } from 'react'

const Article = styled.article`
  margin-top: clamp(0.5rem, 10vh, 9.5rem);
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
`

const Cover = styled.section`
  max-width: 1250px;
  margin: 2rem auto 4rem auto;
`

const StyledCoverImage = styled(GatsbyImage)`
  transition: border-radius 0.3s linear;

  @media screen and (min-width: 1300px) {
    img {
      border-radius: 2.3rem;
    }
  }
`

const SuggestedArticlesList = styled.ul`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const SuggestedArticlesLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-overflow: ellipsis;
  max-width: 15rem;
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
  const coverImage = getImage(cover)
  const [isDynamicCoverVisible, setIsDynamicCoverVisible] = useState(false)
  const [dynamicCover, setDynamicCover] = useState(null)

  return (
    <main>
      <Seo title={title} image={cover?.publicURL} description={description} />
      <Header breadcrumb="Blog" />
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
            image={coverImage}
          />
        </Cover>

        <ArticleSection
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />

        <Section>
          <AuthorAside>
            Hey, thanks for reading! In this blog I share thoughts and tutorials
            about coding, technology, and content creation. Subscribe for some
            exclusive content.
          </AuthorAside>
          <SignUp />
          <nav>
            <SuggestedArticlesList>
              <li>
                {previous && (
                  <SuggestedArticlesLink
                    onMouseEnter={() => {
                      setIsDynamicCoverVisible(true)
                      setDynamicCover(previous.frontmatter.cover)
                    }}
                    onMouseLeave={() => setIsDynamicCoverVisible(false)}
                    to={previous.fields.slug}
                    rel="prev"
                  >
                    <Body2>← {previous.frontmatter.title}</Body2>
                  </SuggestedArticlesLink>
                )}
              </li>
              <li>
                {next && (
                  <SuggestedArticlesLink
                    onMouseEnter={() => {
                      setIsDynamicCoverVisible(true)
                      setDynamicCover(next.frontmatter.cover)
                    }}
                    onMouseLeave={() => setIsDynamicCoverVisible(false)}
                    to={next.fields.slug}
                    rel="next"
                  >
                    <Body2>{next.frontmatter.title} →</Body2>
                  </SuggestedArticlesLink>
                )}
              </li>
            </SuggestedArticlesList>
          </nav>
        </Section>
      </Article>
      <StyledFooter />
      <DynamicCover visible={isDynamicCoverVisible} cover={dynamicCover} />
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
            gatsbyImageData(width: 2300, placeholder: BLURRED, quality: 95)
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
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 900, placeholder: BLURRED, quality: 80)
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 900, placeholder: BLURRED, quality: 80)
          }
        }
      }
    }
  }
`
