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
import courseThumbImage from '../../content/assets/tltr-ts-thumb.jpg'
import Video from '../components/Video'

const Article = styled.article`
  margin-top: clamp(0.5rem, 10vh, 9.5rem);
`

const StyledHeading1 = styled(Heading1)`
  margin-right: 2rem;
  margin-bottom: 0;
`

const Cover = styled.section`
  max-width: 1250px;
  margin: 2rem auto 4rem auto;
`

const StyledCoverImage = styled(GatsbyImage)`
  transition: border-radius 0.3s linear;

  @media screen and (min-width: 1300px) {
    img {
      border-radius: calc(2.3 * 1rem);
    }
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

const BreadcrumbLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const CoursePageTemplate = ({ data }) => {
  const { html } = data?.markdownRemark
  const { title, description, cover, youtubeVideoId, module, articleSlug } =
    data?.markdownRemark?.frontmatter
  const { slug } = data?.markdownRemark?.fields
  const { previous, next } = data
  const coverImage = cover && getImage(cover)

  return (
    <main>
      <Seo title={title} image={courseThumbImage} description={description} />
      <Header breadcrumb="Courses" />
      <CodeHighlighter />
      <Article
        itemScope
        className="blog-post"
        itemType="http://schema.org/Article"
      >
        <Section>
          <header>
            <Label2>
              <BreadcrumbLink to="/courses/tltr-typescript">
                TLTR; Typescript
              </BreadcrumbLink>{' '}
              \ {module}
            </Label2>
            <StyledHeading1 itemProp="headline">{title}</StyledHeading1>
          </header>
        </Section>
        {coverImage && !youtubeVideoId && (
          <Cover>
            <StyledCoverImage
              alt={title}
              aria-hidden="true"
              style={{ width: '100%', minHeight: '67vh' }}
              image={coverImage}
            />
          </Cover>
        )}

        {youtubeVideoId && <Video id={youtubeVideoId} />}

        <ArticleSection
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />

        <Section>
          {articleSlug && (
            <>
              ✍️ <Link to={articleSlug}>Read the article</Link>.
            </>
          )}
          <AuthorAside>
            Hey, I hope you found this page useful.{' '}
            <a href="https://x.com/nicotsou" target="_blank" rel="noreferrer">
              Let me know
            </a>{' '}
            your thoughts. Feel free to{' '}
            <a
              href={`https://github.com/nicotsou/nicotsou.com/tree/master/content/course/typescript${slug}/index.md`}
              target="_blank"
              rel="noreferrer"
            >
              suggest improvements
            </a>
            .
          </AuthorAside>
          <nav>
            <SuggestedArticles>
              <li>
                {previous && (
                  <Link
                    to={`/courses/tltr-typescript${previous.fields.slug}`}
                    rel="prev"
                  >
                    <Body2>← Previous</Body2>
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link
                    to={`/courses/tltr-typescript${next.fields.slug}`}
                    rel="next"
                  >
                    <Body2>Next up: {next.frontmatter.title} →</Body2>
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

export default CoursePageTemplate

export const pageQuery = graphql`
  query CoursePageBySlug(
    $id: String!
    $type: String
    $previousPageId: String
    $nextPageId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        youtubeVideoId
        module
        articleSlug
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 2300, placeholder: BLURRED, quality: 95)
          }
        }
      }
    }
    previous: markdownRemark(
      id: { eq: $previousPageId }
      frontmatter: { type: { eq: $type } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(
      id: { eq: $nextPageId }
      frontmatter: { type: { eq: $type } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
