import React from 'react'
import { connect } from 'react-redux'
import { handleLike } from '../reducers/blogsReducer'

const BlogDetails = (props) => {

    console.log("PROPSIT", props)
    
    const findBlogFromState = (id) =>
        props.blogs.find(item => item.id === id)

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