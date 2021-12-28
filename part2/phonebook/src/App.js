import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  const handleFilter = (event) => {
    setFilter(event.target.value);
    filteredData();
  };

  const filteredData = () => {
    if (filter.length === 0) {
      return persons;
    }
    let tempPersons = [];

    persons.forEach((person) => {
      if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        tempPersons.push(person);
      }
    });

    return tempPersons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilter} />
      </div>

      <h2>add a new</h2>
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
      {filteredData().map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
