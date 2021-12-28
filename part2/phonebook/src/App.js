import React, { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/Personform";
import { Persons } from "./components/Persons";

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

  const addPerson = (event) => {
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
      <Filter filter={filter} handler={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        nameHandler={handleNewName}
        number={newNumber}
        numberHandler={handleNewNumber}
        buttonHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons data={filteredData} />
    </div>
  );
};

export default App;
