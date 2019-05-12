import React from 'react'
import Weather from './Weather'

const CountryData = ({country}) => {

        if (country.length === 0)
            return <></>
        else 
            return (
                <>
                <h1>{country.name}</h1>
                <div>capital: {country.capital}</div>
                <div>population: {country.population}</div>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li> )}
                </ul>
                <img width="150px" alt="flag" src={country.flag}></img>
                <Weather capital={country.capital}></Weather>
                </>
            )

    }

    
    

export default CountryData