import React from 'react'
import Course from './components/course'

const App = ({course}) => {

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App