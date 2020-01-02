import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  
  switch (action.type) {
    case 'LIKE_BLOG':
      const likedBlog = state.find(blog => blog.id === action.data.id)
      likedBlog.likes++
      const newState =  state.map(item => item.id === action.data.id ? likedBlog : item)
      return newState.sort((a, b) => b.likes - a.likes)
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'ADD_BLOG':
      return [...state, action.data].sort((a, b) => b.likes - a.likes)
    case 'REMOVE_BLOG':
      return state.filter(item => action.data !== item.id ).sort((a, b) => b.likes - a.likes)
    case 'DO_NOTHING':
      return state
    case 'ADD_COMMENT':
      const commentedBlog = state.find(blog => blog.id === action.data.id)
      commentedBlog.comments.push(action.data.comment)
      const stateToBeReturned =  state.map(item => item.id === action.data.id ? commentedBlog : item)
      return stateToBeReturned.filter(item => action.data !== item.id ).sort((a, b) => b.likes - a.likes)
    default: 
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const initialBlogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: initialBlogs,
    })
  }
}

//TODO: try-catch for services calls and add notifications here, not in the component

export const addEntry = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: "ADD_BLOG",
      data: newBlog,
    })
  }
}

export const removeBlog = (blog) => {
  if (window.confirm(`Remove ${blog.title}?`)) {
    return async dispatch => {
      await blogService.remove(blog.id)
      dispatch({
        type: "REMOVE_BLOG",
        data: blog.id,
      })
    }
  }
  else 
    return {
    type: 'DO NOTHING', 
    }

}

export const handleLike = (id) => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find(blog => blog.id === id)
    await blogService.update(blogToLike)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id }
    })
  }
}

export const postComment = (data) => {
  return async (dispatch, getState) => {
    await blogService.addComment(data)
    dispatch({
      type: 'ADD_COMMENT',
      data: data
    })
  }
}

export default blogsReducer