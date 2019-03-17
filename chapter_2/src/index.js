import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content name={part1} exc={exercises1} />
      <Content name={part2} exc={exercises2} />
      <Content name={part3} exc={exercises3} />
      <Total total={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>{props.name} {props.exc}</p>
    </>
  )
}


const Total = (props) => {
  return (
    <>
      <p>yhteensä: {props.total.reduce((a, b) => a + b, 0)}</p>
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))