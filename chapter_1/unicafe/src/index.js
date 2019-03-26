import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
  

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Button handleClick={() => {} } text="Hyvä" />
      <Button handleClick={() => {} } text="Neutraali" />
      <Button handleClick={() => {}} text="Huono" />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)