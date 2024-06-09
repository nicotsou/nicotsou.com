import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const AvatarContainer = styled(GatsbyImage)`
  img {
    border-radius: 100%;
  }
`

export default function Avatar({ className }) {
  const data = useStaticQuery(graphql`
    query AvatarQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 100, placeholder: BLURRED, quality: 95)
        }
      }
    }
  `)

  const avatarImage = getImage(data?.avatar)

  return (
    <AvatarContainer alt="avatar" image={avatarImage} className={className} />
  )
}
