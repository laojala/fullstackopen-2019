import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const Label = ({selected,votes}) => {
    return (
        <>
        <div>{anecdotes[selected]}</div>
        <div>Has {votes[selected]} votes</div>
        </>
    )
}


// const Statistics = ({votes, dataArray}) => {
const statistics = (votes, dataArray) => {
    let i = votes.indexOf(Math.max(...votes))
    return (
        <div>
        <h1>Anecdote with most votes</h1>
        <div>{dataArray[i]}</div>
        <div>Has {votes[i]} votes</div>
        </div>
    )
}

const App = (props) => {

  const dataLenght = props.anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(dataLenght).fill(0))


  const setRandom = (anecdotes) => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const giveVote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <Label selected={selected} votes={votes}/>
      <p>
      <Button handleClick={() => giveVote(selected)} text="Vote" />
      <Button handleClick={() => setRandom(anecdotes)} text="Next anecdote" />
      </p>
      {/* <Statistics votes={votes} dataArray={props.anecdotes}/> */}
      <div>{statistics(votes, props.anecdotes)}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)