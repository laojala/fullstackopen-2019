import React from 'react'

import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    
    const voteForId = (id) => {
        store.dispatch(
            vote(id)
          )
      }
  
  return (
    <div>
        {store.getState().map(anecdote =>    
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteForId(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </div>
    
  )
}

export default AnecdoteList