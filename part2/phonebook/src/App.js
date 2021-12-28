import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (checkPersonExist(personObject)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, personObject]);
      setNewName("");
      setNewNumber("");
    }
  };

  const checkPersonExist = (personObject) => {
    let result = false;

    persons.forEach((person) => {
      if (
        person.name === personObject.name &&
        person.number === personObject.number
      ) {
        result = true;
      }
    });

    return result;
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
