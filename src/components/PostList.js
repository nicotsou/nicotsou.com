import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { Heading3Styles } from '../styles/Typography'

const List = styled.ul`
  list-style: none;
  margin-top: 5rem;
  margin-bottom: 6rem;
  padding: 0;
`

const PostItem = styled.li`
  margin-top: 1rem;
`

const PostLink = styled(Link)`
  ${Heading3Styles}
  font-weight: 300;
  text-decoration: none;
`

const PostList = ({ onLinkHover }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <List role="navigation" onMouseLeave={() => onLinkHover(null)}>
      {data.allMarkdownRemark.nodes.map((node, index) => (
        <PostItem key={index}>
          <PostLink
            onMouseEnter={() => onLinkHover(node)}
            to={node.fields.slug}
          >
            {node.frontmatter.title}
          </PostLink>
        </PostItem>
      ))}
    </List>
  )
}

export default PostList
