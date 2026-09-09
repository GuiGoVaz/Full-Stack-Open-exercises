import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text} </td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}

const Statistics = ({ values: { good, neutral, bad } }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(good - bad) / all} />
          <StatisticLine text="positive" value={good * 100 / all} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseByOne = (set, obj) => () => set(obj + 1)



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseByOne(setGood, good)} text={'good'} />
      <Button onClick={increaseByOne(setNeutral, neutral)} text={'neutral'} />
      <Button onClick={increaseByOne(setBad, bad)} text={'bad'} />
      <Statistics values={{ good, neutral, bad }} />





    </div>
  )
}

export default App