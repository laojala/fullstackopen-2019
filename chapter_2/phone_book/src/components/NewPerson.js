import React from 'react'

const NewPerson = (addEntry, newName, handleNewName, newNumber, handleNewNumber) => {
      
      return  <>
        <form onSubmit={addEntry}>
        <div>nimi: <input value={newName}
        onChange={handleNewName} />
        </div>
        <div>numero: <input value={newNumber}
        onChange={handleNewNumber} />
        </div>
        <div><button type="submit">lisää</button></div>
        </form>
      </>
  }

  export default NewPerson