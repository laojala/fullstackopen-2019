import React from 'react'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { setAddNotification } from '../reducers/notificationReducer'

  const AddAnecdote = ({ store }) => {

    const newAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.content.value
      event.target.content.value = ''
      store.dispatch(
        addAnecdote(content)
      )

      //display alert:
      store.dispatch(setAddNotification(content))
      setTimeout(() => store.dispatch(setAddNotification(null)), 5000)

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