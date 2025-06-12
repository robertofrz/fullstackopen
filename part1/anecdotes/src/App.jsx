import { useState } from "react";

const initialAnecdotes = [
  {
    anecdote: "If it hurts, do it more often.",
    votes: 0,
  },
  {
    anecdote: "Adding manpower to a late software project makes it later!",
    votes: 0,
  },
  {
    anecdote:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 0,
  },
  {
    anecdote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    votes: 0,
  },
  {
    anecdote: "Premature optimization is the root of all evil.",
    votes: 0,
  },
  {
    anecdote:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    votes: 0,
  },
  {
    anecdote:
      "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    votes: 0,
  },
  {
    anecdote: "The only way to go fast, is to go well.",
    votes: 0,
  },
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const handleVote = () => {
    const updated = [...anecdotes];
    updated[selected] = {
      ...updated[selected],
      votes: updated[selected].votes + 1,
    };
    setAnecdotes(updated);
  };

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const mostVoted = anecdotes.reduce(
    (max, anecdote) => (anecdote.votes > max.votes ? anecdote : max),
    anecdotes[0]
  );

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected].anecdote}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <Button text="Vote" onClick={handleVote} />
      <Button text="Next anecdote" onClick={handleNext} />
      <h2>Anecdote with most votes</h2>
      {mostVoted.votes > 0 ? (
        <div>
          <p>{mostVoted.anecdote}</p>
          <p>has {mostVoted.votes} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;

export const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};
