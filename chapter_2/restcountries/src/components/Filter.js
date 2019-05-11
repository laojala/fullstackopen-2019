import React from 'react'

const Filter = (newFilter, setFilter) => 

<form onSubmit={doNothing}>
    Filter countries:  
    <input value={newFilter} onChange={setFilter}/>
</form>

const doNothing = (event) => event.preventDefault()

export default Filter