import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    
    const voteForId = (id, content) => {
        props.vote(id)
        //display alert:
        props.setNotification(`you voted '${content}'`, 10)
      }
  
  return (
    <div>
        {props.visibleAnecdotes.map(anecdote => 
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => voteForId(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
        
        )}
    </div>
    
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === "") {
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}


const mapStateToProps = (state) => {
    console.log("mapStateToProps, AnecdoteList: ", state)
    return {
      visibleAnecdotes: anecdotesToShow(state),
      filter: state.filter,
      notification: state.notification
    }
  }

  const mapDispatchToProps = {
    setNotification,
    vote,
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)
