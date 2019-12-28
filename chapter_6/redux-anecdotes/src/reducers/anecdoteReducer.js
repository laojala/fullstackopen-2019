import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action.data)

  switch (action.type) {
    case 'VOTE':
      let likedAnecdote = state.find(anecdote => anecdote.id === action.data.id)
      likedAnecdote.votes++
      console.log(likedAnecdote)
      const newState =  state.map(item => item.id === action.data.id ? likedAnecdote : item)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    case 'NEW_ANECDOTE':
      const newAnecdote =  {
        content: action.data.content,
        id: action.data.id,
        votes: 0
      }
      console.log('new:',newAnecdote)
      return [...state,newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(anecdote => anecdote.id === id)
    anecdoteService.changeContent(anecdoteToVote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}


export const addAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: initialAnecdotes,
    })
  }
}

export default anecdoteReducer