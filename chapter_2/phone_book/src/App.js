import React, { useState } from 'react'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  
  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} already added`)
    }
    else {
      setPersons(persons.concat(entryObject))
    }
    setNewName('')
    setNewNumber('')
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
        {PhoneBook(persons, newFilter)}
    </div>
  )

}

export default App