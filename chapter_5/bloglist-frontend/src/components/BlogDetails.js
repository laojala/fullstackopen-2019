import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleLike } from '../reducers/blogsReducer'
import { postComment } from '../reducers/blogsReducer'

const BlogDetails = (props) => {

  const [commentText, setCommentText] = useState('')

  const setNewComment = (event) => {
    setCommentText(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    const blogComment = {
      id: props.blog.id,
      comment: commentText
    }
    setCommentText('')
    props.postComment(blogComment)
  }

  const findBlogFromState = (id) =>
    props.blogs.find(item => item.id === id)

  const comments = (blog) => {
    if (blog.comments.length === 0)
      return null
    else
      return (
        <div>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      )
  }

  if (!props.blog) {
    return null
  }
  else {
    const currentBlog = findBlogFromState(props.blog.id)

    return (
      <div>
        <h2>{currentBlog.title}</h2>
        <div>
          <a href="currentBlog.url">{currentBlog.url}</a>
        </div>
        <div>
          {currentBlog.likes} likes
          <button onClick={() => props.handleLike(currentBlog.id)}>like</button>
        </div>
        <div>
              author: {currentBlog.author}
        </div>
        <h3>comments:</h3>
        <div>
          <form onSubmit={addComment}>
            <input value={commentText} onChange={setNewComment} />
            <button type="Submit">Add comment</button>
          </form>
        </div>
        <div>{comments(currentBlog)}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  handleLike,
  postComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails)