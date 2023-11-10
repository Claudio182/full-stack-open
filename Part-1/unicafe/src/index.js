import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Button = (props) =>{
  return (
    <button onClick={props.handleClick}>
      {props.name}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.count}</td>      
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (!good && !neutral && !bad) {
    return "No feedback given"
  }
  const all = good + neutral + bad
  const average = (good + (bad * -1) ) / (good + neutral + bad)
  const positive = (good / (good + neutral + bad) * 100) + "%"

  return(
    <table>
      <tbody>
        <StatisticsLine name="good" count={good} />
        <StatisticsLine name="neutral" count={neutral}  />
        <StatisticsLine name="bad" count={bad} />
        <StatisticsLine name="all" count={all} />
        <StatisticsLine name="average" count={average} />
        <StatisticsLine name="positive" count={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood( good + 1 )
  const handleClickNeutral = () => setNeutral( neutral +1 )
  const handleClickBad = () => setBad( bad + 1 )
  
  return (
    <div>
      <h1>Give feedback</h1>
        <Button handleClick={handleClickGood} name="good" />
        <Button handleClick={handleClickNeutral} name="neutral" />
        <Button handleClick={handleClickBad} name="bad"  />
      <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);