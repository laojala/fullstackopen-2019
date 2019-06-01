import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, usersToBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    blog.likes += 1
    setLikes(blog.likes)
    blogService.update(blog)
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
          {likes} likes
          <button style={buttonStyle} onClick={handleLike}>like</button>
        </div>
        <div>Added by: {user()}</div>
      </div>
    </div>
  )
}

export default Blog