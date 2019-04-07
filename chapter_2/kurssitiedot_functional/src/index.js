import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const course = {
  name: 'Half Stack -sovelluskehitys',
  parts: [
    {
      name: 'Reactin perusteet',
      exercises: 10,
      id: 1
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7,
      id: 2
    },
    {
      name: 'Komponenttien tila',
      exercises: 14,
      id: 3
    }
  ]
}

ReactDOM.render(<App course={course}/>, document.getElementById('root'))