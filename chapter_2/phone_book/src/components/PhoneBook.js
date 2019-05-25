import React from 'react'

const PhoneBook = (persons, newFilter, removeEntry) => {
    let filterUpperCase = newFilter.toUpperCase()
    let newArray = persons.filter((person)=>{
      let personInUpperCase = person.name.toUpperCase()
      return personInUpperCase.includes(filterUpperCase)
    })
    return newArray.map(person => 
      <div key={person.name}>{person.name} {person.number}<button onClick={() => removeEntry(person)}>poista</button>
      </div>)
  }

  export default PhoneBook