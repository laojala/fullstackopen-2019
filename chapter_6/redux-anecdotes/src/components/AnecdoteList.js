import React from 'react'

import { vote } from '../reducers/anecdoteReducer'
import { setVoteNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    
    const voteForId = (id, content) => {
        store.dispatch(vote(id))

        //display alert:
        store.dispatch(setVoteNotification(content))
        setTimeout(() => 
        store.dispatch(setVoteNotification(null)), 5000)
      }
  
  return (
    <div>
        {store.getState().anecdotes.map(anecdote =>    
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

export default AnecdoteList