export const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);
  return <p>Number of exercises {total}</p>;
};
