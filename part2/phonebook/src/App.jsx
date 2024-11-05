import { useState } from "react";

const Filter = () => {
  return (
    <div>
      filter shown with <input />
    </div>
  );
};

const PersonForm = ({ persons, setPersons, newName, setNewName }) => {
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: Math.floor(Math.random() * 1000000000),
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = () => {
  return (
    <div>
      <ul>
        <li>Arto Hellas</li>
        <li>Ada Lovelace</li>
        <li>Dan Abramov</li>
        <li>Mary Poppendieck</li>
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter />

      <h3>Add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
      />

      <h3>Numbers</h3>

      <Persons />
    </div>
  );
};

export default App;
