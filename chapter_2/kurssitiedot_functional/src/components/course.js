import React from 'react'

const Course = (props) => {
  return (
    <>
    <div>{Header(props)}</div>
    <div>{Content(props.course.parts)}</div>
    <div>{Total(props.course.parts)}</div>
    </>
  )
}

const Header = (props) => 
    <div>
      <h1>{props.course.name}</h1>
    </div>

const Content = (props) => 
  <>{props.map(p => <div key={p.name}>{p.name}: {p.exercises}</div>)}</>

const Total = (props) => 
  <p>Yhteensä: {props.reduce((sum, part) => sum + part.exercises, 0)}</p>


  export default Course