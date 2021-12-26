import React, { useState, useEffect } from "react";

const Button = ({ title, handleClick }) => (
  <button onClick={handleClick}>{title}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(null);

  useEffect(() => {
    const findMostVoted = () => {
      setMostVoted(points.indexOf(Math.max(...points)));
    };

    findMostVoted();
  }, [points]);

  const handleVote = () => {
    const tempPoints = [...points];
    tempPoints[selected]++;
    setPoints([...tempPoints]);
  };

  const handleNext = () => {
    if (selected === anecdotes.length - 1) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>

      <div>
        <Button title="vote" handleClick={handleVote} />
        <Button title="next anecdote" handleClick={handleNext} />
      </div>
      <h1>Anecdote with most votes</h1>
      {points[mostVoted] === 0 ? null : (
        <>
          <div>{anecdotes[mostVoted]}</div>
          <div>has {points[mostVoted]} votes</div>
        </>
      )}
    </>
  );
};

export default App;
