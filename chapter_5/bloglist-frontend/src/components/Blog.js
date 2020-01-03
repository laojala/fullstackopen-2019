import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router,Link } from 'react-router-dom'

const Blog = ({ blog, users, user, handleNewLike, removeBlog, index }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const userForBlog = () => {
    const userId = blog.user
    return users.find(user => user.id === userId).name
  }

  const displayRemoveForUserWhoAdded = () => {
    const nameWhoAdded = users.find(user => user.id === blog.user).username

    if(nameWhoAdded === user.username)
      return <button onClick={removeBlog}>Remove</button>
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
    <div style={blogStyle} data-testid={index}>
      <div onClick={toggleVisibility} data-testid="always_visible">
  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <span data-testid="author">{blog.author}</span>
      </div>
      <div style={showWhenVisible} data-testid="toggleable">
        <div><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
        <div>
          <span data-testid="likes">{blog.likes}</span> likes
          <button data-testid="like_btn" style={buttonStyle} onClick={handleNewLike}>like</button>
        </div>
        <div>Added by: {userForBlog()}</div>
        <div>{displayRemoveForUserWhoAdded()}</div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleNewLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog