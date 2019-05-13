import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])



  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName)) {

      let personId = persons.find(item => item.name === newName)
    
      let updatedEntry = Object.assign(personId, entryObject)

      if (window.confirm(`Do you want to update ${newName} with number ${newNumber}?`)) {
        personsService
        .update(personId.id, entryObject)
          .then( () => {
            setPersons(persons.map(item => (item.name === newName) ? updatedEntry : item))
            setNewName('')
            setNewNumber('')
          })  
      }
    }
    
    else {
        personsService
        .create(entryObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
      
  }

  const removeEntry = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) { 
      personsService
      .remove(person.id)
        .then( () => {
          setPersons(persons.filter(item => item.id !== person.id ))
        })
      .catch(error => {
          console.log("id already removed (or other problem")
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)  
  }

  const handleNewNumber= (event) => {
    setNewNumber(event.target.value)  
  }

  const filterNames = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
     {Filter(newFilter, filterNames)}
      <h2>Lisää uusi</h2>
        {NewPerson(addEntry, newName, handleNewName, newNumber, handleNewNumber)}
      <h2>Numerot</h2>
        {PhoneBook(persons, newFilter, removeEntry)}
    </div>
  )

}

export default App