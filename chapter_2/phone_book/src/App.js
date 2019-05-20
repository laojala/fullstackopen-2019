import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import PhoneBook from './components/PhoneBook'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification] = useState(null)

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
            showMessage(`Käyttäjän ${newName} puhelinnumero päivitetty`)
          })
          .catch(error => {
            showMessage(`Päivitys epäonnistui. Käyttäjä ${newName} on jo poistettu puhelinluettelosta.`, false)
            setPersons(persons.filter(n => n.name !== newName))
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
          showMessage(`Käyttäjä ${newName} on lisätty puhelinluetteloon`)
        })
      }
      
  }

  const removeEntry = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) { 
      personsService
      .remove(person.id)
        .then( () => {
          setPersons(persons.filter(item => item.id !== person.id ))
          showMessage(`Käyttäjä ${person.name} on poistettu puhelinluettelosta`)
        })
      .catch(error => {
          showMessage(`Poisto epäonnistui. Käyttäjä ${person.name} on jo poistettu puhelinluettelosta.`, false)
          console.log("id already removed (or other problem)")
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

  const showMessage = (message, successNotification=true) => {
    setNotification(successNotification)
    setNotification(message)
    
    setTimeout(() => {
      setNotification(null)
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>{Notification(notification, notification)}</div>
     {Filter(newFilter, filterNames)}
      <h2>Lisää uusi</h2>
        {NewPerson(addEntry, newName, handleNewName, newNumber, handleNewNumber)}
      <h2>Numerot</h2>
        {PhoneBook(persons, newFilter, removeEntry)}
    </div>
  )

}

export default App