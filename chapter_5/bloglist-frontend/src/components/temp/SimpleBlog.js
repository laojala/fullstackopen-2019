import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <span data-testid='title'>{blog.title}</span> <span data-testid='author'>{blog.author}</span>
    </div>
    <div data-testid='likesRow'>
      blog has {blog.likes} likes
      <button data-testid='likeButton' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
