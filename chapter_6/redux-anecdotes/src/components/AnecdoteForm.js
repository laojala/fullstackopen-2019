import React from 'react'

import { addAnecdote } from '../reducers/anecdoteReducer'

  const AddAnecdote = (props) => {
    const newAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.content.value
      event.target.content.value = ''
      props.store.dispatch(
        addAnecdote(content)
      )
    }
  
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
            <div><input name="content"/></div>
            <button type="submit">create</button>
        </form>
    </div>
    
  )
}

export default AddAnecdote