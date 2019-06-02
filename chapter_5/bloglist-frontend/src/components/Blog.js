import React, { useState } from 'react'

const Blog = ({ blog, users, user, handleNewLike, removeBlog }) => {
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
        <div>Added by: {userForBlog()}</div>
        <div>{displayRemoveForUserWhoAdded()}</div>
      </div>
    </div>
  )
}

export default Blog