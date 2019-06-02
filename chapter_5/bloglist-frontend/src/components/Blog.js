import React, { useState } from 'react'

const Blog = ({ blog, usersToBlog, handleNewLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const user = () => {
    const userId = blog.user
    return usersToBlog.find(user => user.id === userId).name
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    margin: 5,
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
        <div>
          {blog.likes} likes
          <button style={buttonStyle} onClick={handleNewLike}>like</button>
        </div>
        <div>Added by: {user()}</div>
        <div><button onClick={removeBlog}>Remove</button></div>
      </div>
    </div>
  )
}

export default Blog