import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <span className='title'>{blog.title}</span> <span className='author'>{blog.author}</span>
    </div>
    <div className='likesRow'>
      blog has <span className='likes'>{blog.likes}</span> likes
      <button className='likeButton' onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
