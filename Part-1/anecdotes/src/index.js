import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Title = ({ text }) => <h2> { text } </h2> 

const Anecdote = ({ anecdotes, votes, selected }) => {
  return(
    <>
      <h4>{anecdotes[selected]}</h4>
      <p>has {votes[selected]} votes.</p>
    </>
  )
}

const Winner = ({ anecdotes, votes }) => {
  const maxVote = Math.max(...votes)
  const indexWin = votes.indexOf(maxVote)
  if ( maxVote === 0 )  return <p>No votes yet</p>
  return (
    <>
      <p>{ anecdotes[indexWin] }</p>
      <p>has {maxVote} votes</p>
    </>
  )  
}

const Button = ({ handleClick, text })=> {
  return <button onClick={ handleClick }>{ text }</button>
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( Array(6).fill(0) )
  
  const random = () => Math.floor( (5 - 0) * Math.random() +1 )
  
  const handleRandom = ()=> setSelected( random() )
  const handleVotes = () => {
    const copy = votes.slice()
    copy[selected] += 1
    return setVotes(copy)
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button handleClick={handleRandom} text="Next anecdote" />
      <Button handleClick={handleVotes} text="Vote" />
      <Title text="Anecdote with most votes" />
      <Winner votes={votes} anecdotes={anecdotes} />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
