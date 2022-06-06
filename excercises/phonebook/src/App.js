import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPN, setPN] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleAddButton = (event) => {
    event.preventDefault();
    // compare person's name existing in the array with newName if newName already in persons array send out alert ${newName} is already added to phone book
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phone book`);
      return;
    }
    const tempObj = { name: newName, number: newPN };
    setPersons(persons.concat(tempObj));
    setNewName("");
    setPN("");
    setNewFilter("");
  };

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleOnChangePN = (event) => {
    setPN(event.target.value);
  };

  const handleOnChangeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredpersons =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={newFilter} onChange={handleOnChangeFilter} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleOnChangeName} />
        </div>
        <div>
          number <input value={newPN} onChange={handleOnChangePN} />
        </div>
        <div>
          <button onClick={handleAddButton} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredpersons.map((person) => {
          return (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
