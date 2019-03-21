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
      <Content names={[part1, part2, part3]} exc={[exercises1, exercises2, exercises3]} />
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
      <Part name={props.names[0]} exc={props.exc[0]}/>
      <Part name={props.names[1]} exc={props.exc[1]}/>
      <Part name={props.names[2]} exc={props.exc[2]}/>
    </>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exc}</p>
    </div>
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