import React from 'react'

import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = ( {store} ) => {
  
    const handleChange = (event) => {
    event.preventDefault()
    const filterInput = event.target.value
    store.dispatch(filterAnecdotes(filterInput))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="content" onChange={handleChange} />
    </div>
  )
}

export default Filter