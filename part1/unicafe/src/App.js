import React, { useState } from "react";

const Statistic = ({}) => {
  return;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(1);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100.0;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button>good</button>
        <button>neutral</button>
        <button>bad</button>
      </div>
      <h1>statistic</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </div>
  );
};

export default App;
