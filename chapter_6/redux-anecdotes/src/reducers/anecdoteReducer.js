import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

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
        id: getId(),
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
  return {
    type: 'VOTE',
    data: { id }
  }
}


export const addAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
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