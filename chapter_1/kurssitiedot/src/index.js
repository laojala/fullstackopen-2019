import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )


}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
    <p>{props.parts[0].name + " " + props.parts[0].exercises}</p>
    <p>{props.parts[1].name + " " + props.parts[1].exercises}</p>
    <p>{props.parts[2].name + " " + props.parts[2].exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>{props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
    </>
  )
}





ReactDOM.render(<App />, document.getElementById('root'))