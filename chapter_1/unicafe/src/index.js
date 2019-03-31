import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

  const History = (props) => {
    return (
      <div>
        <h1>Statistiikka</h1>
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
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
      <History good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)