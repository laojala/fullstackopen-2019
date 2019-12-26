import React from 'react'

import { filterAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="content" onChange={(event) =>
        props.filterAnecdotes(event.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes
}

export default connect(null, mapDispatchToProps)(Filter)