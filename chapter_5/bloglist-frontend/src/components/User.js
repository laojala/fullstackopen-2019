import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {

  const showBlog = (blog) => {
    if (blog.user === props.user.id)
      return <li>{blog.title}</li>
  }

  if ( props.user === undefined || props.blogs.length === 0) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>

      <h3>added blogs</h3>
      <ul>
        {props.blogs.map((blog, index) => (
          <span key={index}>{showBlog(blog)}</span>
        ))}
      </ul>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

export default connect(mapStateToProps, null)(User)