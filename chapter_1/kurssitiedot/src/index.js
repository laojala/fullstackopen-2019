import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
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

const Content = ({parts}) => {
  return <>{parts.map(p => 
    <div key={p.name}>
    {p.name}: {p.exercises}</div>)}
  </>

}

const Total = ({parts}) => {
  console.log(parts)

  const Total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return <><div>Yhteensä: {Total}</div>
  </>
  
}


ReactDOM.render(<App />, document.getElementById('root'))