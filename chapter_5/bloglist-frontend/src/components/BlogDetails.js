import React from 'react'
import { connect } from 'react-redux'
import { handleLike } from '../reducers/blogsReducer'

const BlogDetails = (props) => {
    
    const findBlogFromState = (id) =>
        props.blogs.find(item => item.id === id)

    const comments = (blog) => {
      if (blog.comments.length === 0)
        return null
      else
        return (
        <div>
          <h3>comments:</h3>
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
            {comments(currentBlog)}
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
  }

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails)