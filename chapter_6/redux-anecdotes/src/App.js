import React from 'react';

import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      {
      <AnecdoteForm store={props.store} />
      /* <form onSubmit={newAnecdote}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form> */}
    </div>
  )
}

export default App