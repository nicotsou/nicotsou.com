const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`)
  const coursePageTemplate = path.resolve(`./src/templates/coursePage.js`)
  const talkPageTemplate = path.resolve(`./src/templates/talkPage.js`)

  // Get all markdown blog posts sorted by date
  let result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: ASC } }
          filter: { frontmatter: { type: { eq: "post" } } }
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { order: ASC } }
          filter: { frontmatter: { type: { eq: "course" } } }
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const coursePages = result.data.allMarkdownRemark.nodes

  result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: ASC } }
          filter: { frontmatter: { type: { eq: "talk" } } }
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading this conference talk page`,
      result.errors
    )
    return
  }

  const talkPages = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          previousPostId,
          nextPostId,
          id: post.id,
          type: 'post',
        },
      })
    })
  }

  if (coursePages.length > 0) {
    coursePages.forEach((page, index) => {
      const previousPageId = index === 0 ? null : coursePages[index - 1].id
      const nextPageId =
        index === coursePages.length - 1 ? null : coursePages[index + 1].id

      createPage({
        path: `courses/tltr-typescript${page.fields.slug}`,
        component: coursePageTemplate,
        context: {
          previousPageId,
          nextPageId,
          id: page.id,
          type: 'course',
        },
      })
    })
  }

  if (talkPages.length > 0) {
    talkPages.forEach((page, index) => {
      const previousPageId = index === 0 ? null : talkPages[index - 1].id
      const nextPageId =
        index === talkPages.length - 1 ? null : talkPages[index + 1].id

      createPage({
        path: `talks${page.fields.slug}`,
        component: talkPageTemplate,
        context: {
          previousPageId,
          nextPageId,
          id: page.id,
          type: 'talk',
        },
      })
    })
  }

  // Shortlinks redirect to full URLs
  createRedirect({
    fromPath: `/l/prompt-engineering-masterclass-talk`,
    toPath: `/talks/prompt-engineering-masterclass`,
    isPermanent: true,
    force: true,
    redirectInBrowser: true,
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      type: String
      youtubeVideoId: String
      order: Int
      module: String
      articleSlug: String
    }

    type Fields {
      slug: String
    }
  `)
}
