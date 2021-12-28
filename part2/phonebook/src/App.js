import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const addNumber = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1,
    };

    if (checkPersonExist(personObject)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, personObject]);
      setNewName("");
    }
  };

  const checkPersonExist = (personObject) => {
    let result = false;

    persons.forEach((person) => {
      if (person.name === personObject.name) {
        result = true;
      }
    });

    return result;
  };

  const handleNewNumber = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
