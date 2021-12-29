import React from "react";

export const Persons = ({ data, handleDeletePerson }) => {
  return (
    <div>
      {data().map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}{" "}
          <button onClick={() => handleDeletePerson(person)}>Delete</button>
        </p>
      ))}
    </div>
  );
};
