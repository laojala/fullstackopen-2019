import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

  const AddAnecdote = (props) => {

    const newAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.content.value
      event.target.content.value = ''
      props.addAnecdote(content)
      props.setNotification(`new anecdote added: '${content}'`, 10)
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
  setNotification,
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