import React from "react";

export const Persons = ({ data }) => {
  return (
    <div>
      {data().map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  );
};
