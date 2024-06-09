import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Header from '../components/Layout/Header'
import { Heading1 } from '../styles/Typography'
import BlogStyles from '../styles/BlogStyles'
import Footer from '../components/Layout/Footer'
import styled, { css } from 'styled-components'
import CodeHighlighter from '../styles/CodeHighlighter'
import Seo from '../components/seo'
import courseThumbImage from '../../content/assets/tltr-ts-thumb.jpg'
import Video from '../components/Video'
import SignUp from '../components/SignUp'

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
  margin-bottom: 6rem;
`

const Section = styled.section`
  ${SectionStyles}
`

const StyledFooter = styled(Footer)`
  ${SectionStyles}
`

const MarkdownPageTemplate = ({ data }) => {
  const { html } = data?.markdownRemark
  const { title, description, cover, youtubeVideoId, navHeaderTitle } =
    data?.markdownRemark?.frontmatter
  const coverImage = cover && getImage(cover)

  return (
    <main>
      <Seo title={title} image={courseThumbImage} description={description} />
      <Header breadcrumb={navHeaderTitle} />
      <CodeHighlighter />
      <Article
        itemScope
        className="blog-post"
        itemType="http://schema.org/Article"
      >
        <Section>
          <header>
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
          <SignUp />
        </Section>
      </Article>
      <StyledFooter />
    </main>
  )
}

export default MarkdownPageTemplate

export const pageQuery = graphql`
  query CoursePageBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        navHeaderTitle
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 2300, placeholder: BLURRED, quality: 95)
          }
        }
      }
    }
  }
`
