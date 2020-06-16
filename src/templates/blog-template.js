import React from 'react'
import './blog-template.css'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { SEO } from '../components'
import { Tag, Divider, Typography } from 'antd'
import useAvatar from '../hooks/use-avatar'

export default function PageTemplate({ data: { mdx, site }, pageContext }) {
  const { Paragraph } = Typography
  const { previous, next } = pageContext
  const image = useAvatar()
  //Render
  return (
    <div className="container">
      <SEO title={mdx.frontmatter.title} />
      <h1>{mdx.frontmatter.title}</h1>
      <MDXProvider>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
      <nav className="nav-bar">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        <div>
          <Tag>ReactJS</Tag>
          <Tag>GatsbyJS</Tag>
        </div>
        <Divider></Divider>
        <footer>
          <Img
            fixed={image.childImageSharp.fixed}
            style={{
              marginBottom: '16px',
              borderRadius: '50%',
              height: '100px',
              width: '100px',
            }}
            alt="Avatar"
          ></Img>
          <div className="footer-text">
            <h2>Written by {site.siteMetadata.author}</h2>
            <Paragraph>
              I am an aspiring developer and interested in full-stack web
              development. I enjoy writing blogs as a note for myself and
              sharing my knowledge. I like playing League Of Legends and
              skateboarding.
            </Paragraph>
          </div>
        </footer>
      </nav>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`
