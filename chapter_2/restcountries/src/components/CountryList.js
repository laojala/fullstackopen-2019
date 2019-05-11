import React from 'react'
import CountryData from './CountryData'

const CountryList = (countries, currentFilter, setFilterUsingButton) => {

    let filteredList = countries.filter(country => country.name.toUpperCase().includes(currentFilter.toUpperCase()))
    let listLength =  filteredList.length

    if (countries.length === 0 || currentFilter.length === 0 || listLength === 0) {
        return <div></div>  
    }
    if (listLength >= 10)
        return <div>too many matches, specify another filter</div>
    
    else if (listLength > 1)
        return filteredList.map(country => 
                <div key={country.name}>{country.name} 
                    <button value={country.name} onClick={setFilterUsingButton}>show data</button>
                </div>
        )
    
    else { //list lenght === 1, display details of the country
        return <>{CountryData(filteredList[0])}</>
    }
    
}


export default CountryList