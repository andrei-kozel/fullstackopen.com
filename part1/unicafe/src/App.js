import React, { useState } from "react";

const Statistic = ({ title, value }) => {
  return (
    <p>
      {title}: {value}
    </p>
  );
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
      <Statistic title="good" value={good} />
      <Statistic title="neutral" value={neutral} />
      <Statistic title="bad" value={bad} />
      <Statistic title="all" value={total} />
      <Statistic title="average" value={average} />
      <Statistic title="positive" value={positive + "%"} />
    </div>
  );
};

export default App;
