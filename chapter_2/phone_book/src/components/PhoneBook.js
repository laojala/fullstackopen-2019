import React from 'react'

const PhoneBook = (persons, newFilter) => {
    let filterUpperCase = newFilter.toUpperCase()
    let newArray = persons.filter((person)=>{
      let personInUpperCase = person.name.toUpperCase()
      return personInUpperCase.includes(filterUpperCase)
    })
    return newArray.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  }

  export default PhoneBook