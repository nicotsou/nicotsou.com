import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'

const Seo = ({ description, article, title, image }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            defaultImage
            description
            defaultDescription
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const {
    title: defaultTitle,
    defaultImage,
    defaultDescription,
    siteUrl,
    social,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet
      title={seo.title}
      titleTemplate={defaultTitle ? `%s · ${defaultTitle}` : null}
    >
      <html lang="en" amp />
      <meta
        http-equiv="cache-control"
        content="public, max-age=0, must-revalidate"
      />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {social.twitter && (
        <meta name="twitter:creator" content={social.twitter} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  description: ``,
}

Seo.propTypes = {
  article: PropTypes.bool,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Seo
