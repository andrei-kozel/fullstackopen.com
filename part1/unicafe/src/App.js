import React, { useState } from "react";

const StatisticLine = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ title, handleClick }) => {
  return <button onClick={handleClick}>{title}</button>;
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine title="good" value={good} />
        <StatisticLine title="neutral" value={neutral} />
        <StatisticLine title="bad" value={bad} />
        <StatisticLine title="all" value={total} />
        <StatisticLine title="average" value={average} />
        <StatisticLine title="positive" value={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100.0;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button title="good" handleClick={() => setGood(good + 1)} />
        <Button title="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button title="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <h1>statistic</h1>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
