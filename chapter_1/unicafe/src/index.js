import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

  const Statistic = (props) => {
    return (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    )
  }
  
  const Statistics = (props) => {
    let good = props.good
    let neutral = props.neutral
    let bad = props.bad

    if (good === 0 & neutral === 0 & bad === 0 ) {
      return (
        <div>
          sovellusta käytetään nappeja painelemalla
        </div>
      )
    }

    return (
      <div>
        <h1>Statistiikka</h1>
        <table>
        <tbody>
          <tr>
            <Statistic text="hyvä" value ={good} />
          </tr>
          <tr>
            <Statistic text="neutraali" value ={neutral} />
          </tr>
          <tr>
            <Statistic text="huono" value ={bad} />
          </tr>
          <tr>
            <td>Yhteensä: </td><td>{good+neutral+bad}</td>
          </tr>
          <tr>
            <td>Keskiarvo: </td><td>{(good-bad)/(good+neutral+bad)}</td>
          </tr>
          <tr>
            <td>Positiivisia: </td><td>{good/(good+neutral+bad)} %</td>
          </tr>
        </tbody>
        </table>
       </div>
      
    )
    
  }

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = newValue => {
    setGood(newValue)
  }

  const handleNeutral = newValue => {
    setNeutral(newValue)
  }

  const handleBad = newValue => {
    setBad(newValue)
  }
  

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={() => handleGood(good+1)} text="hyvä" />
      <Button handleClick={() => handleNeutral(neutral+1)} text="Neutraali" />
      <Button handleClick={() => handleBad(bad+1)} text="Huono" />
      <Statistics good={good} neutral={neutral} bad={bad} />    
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)