import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setAddNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

  const AddAnecdote = (props) => {

    const newAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.content.value
      event.target.content.value = ''
      const newAnecdote = await anecdoteService.createNew(content)
      props.addAnecdote(newAnecdote)

      // //display alert:
      props.setAddNotification(content)
      setTimeout(() => 
        props.setAddNotification(null), 5000)

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

const mapDispatchToProps = {
  setAddNotification,
  addAnecdote,
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps, AnecdoteForm: ", state)
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(AddAnecdote)