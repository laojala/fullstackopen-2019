import React from 'react'

const Filter = (newFilter, filterNames) => 

<form onSubmit={doNothing}>
    Rajaa näytettäviä: 
    <input value={newFilter} onChange={filterNames}/>
</form>

const doNothing = (event) => event.preventDefault()

export default Filter