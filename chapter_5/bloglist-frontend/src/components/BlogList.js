import React, { useState } from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import Blog from './Blog'
import AddBlog from './AddBlog'
import { setNotification } from '../reducers/notificationReducer'
import { addEntry, handleLike, removeBlog } from '../reducers/blogsReducer'

const BlogList = (props) => {

  //add new blog
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const blogFormRef = React.createRef()

  const handleNewTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlogEntry = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
    props.addEntry(blogObject)
    props.setNotification(`Added blog "${blogObject.title}"`, true)

  }

  const removeBlogEntry = (blog) => {
    props.removeBlog(blog)
    props.setNotification(`Blog "${blog.title}" removed`, true)
  }

  if (props.allUsers.length === 0 || props.loggedUser.length === 0)
    return (<>
      {console.log('Loading users...')}
      <div>Loading users...</div></>
    )
  else
    return (
      <>
      <h2>Blogs</h2>
      <Togglable buttonLabel='Add blog' ref={blogFormRef}>
        <div>{AddBlog(addBlogEntry, newTitle, handleNewTitle, newAuthor, handleNewAuthor, newUrl, handleNewUrl)}</div>
      </Togglable>
      <br/>
      <div>
        {props.blogs.map((blog, index) =>
          <Blog
            key={blog.id}
            blog={blog}
            users={props.allUsers}
            user={props.loggedUser}
            handleNewLike={() => props.handleLike(blog.id)}
            removeBlog = {() => removeBlogEntry(blog)} 
            index = {index}/>
        )}
      </div>
      </>
    )
}

const blogsInOrder = ({ blogs }) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogs: blogsInOrder(state),
    loggedUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  setNotification,
  handleLike,
  addEntry,
  removeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)