import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/Personform";
import { Persons } from "./components/Persons";
import { Notification } from "./components/Notification";
import phoneBookService from "./services/phonebook.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    phoneBookService.getAll().then((data) => {
      setPersons(data);
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const personToCheck = checkPersonExist(personObject);

    if (personToCheck.result) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = { ...personObject, id: personToCheck.person.id };

        phoneBookService
          .updatePerson(personToUpdate)
          .then(() => {
            setNewName("");
            setNewNumber("");
            fetchData();
          })
          .then(() => {
            setNotificationMessage({
              type: "success",
              msg: `${personToUpdate.name} successfully updated`,
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage({
              type: "error",
              msg: `Can't find person to update. Probably information about ${personToUpdate.name} has already been removed from the server`,
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            fetchData();
          });
      }
    } else {
      phoneBookService
        .addPerson(personObject)
        .then(() => {
          fetchData();
          setNewName("");
          setNewNumber("");
        })
        .then(() => {
          setNotificationMessage({
            type: "success",
            msg: `${personObject.name} successfully added`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage({
            type: "error",
            msg: `Can't save person to the server`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const checkPersonExist = (personObject) => {
    let result = { result: false, person: null };

    persons.forEach((person) => {
      if (person.name === personObject.name) {
        result = { result: true, person: person };
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

  const handleDeletePerson = (person) => {
    if (window.confirm("Are you shure?")) {
      phoneBookService
        .deletePerson(person)
        .then(() => {
          fetchData();
        })
        .then(() => {
          setNotificationMessage({
            type: "success",
            msg: `${person.name} successfully deleted`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage({
            type: "error",
            msg: `${person.name} has been already deleted`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
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
      <Notification message={notificationMessage} />
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
      <Persons data={filteredData} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
