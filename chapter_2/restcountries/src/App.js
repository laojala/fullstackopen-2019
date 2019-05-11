import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const setFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const setFilterUsingButton = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <>
      <div>{Filter(newFilter, setFilter)}</div>
      <div>{CountryList(countries, newFilter, setFilterUsingButton)}</div>
    </>
   );
}

export default App;
