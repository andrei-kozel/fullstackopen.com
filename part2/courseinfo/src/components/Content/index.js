import { Part } from "../Part";

export const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part part={part} key={index} />
    ))}
  </div>
);
