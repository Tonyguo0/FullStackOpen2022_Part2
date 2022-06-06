import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddButton = (event) => {
    event.preventDefault();
    // compare person's name existing in the array with newName if newName already in persons array send out alert ${newName} is already added to phone book
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phone book`);
      return;
    }
    const tempObj = { name: newName };
    setPersons(persons.concat(tempObj));
    setNewName("");
  };

  const handleOnChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
          <div>debug: {newName}</div>
        </div>
        <div>
          <button onClick={handleAddButton} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <div key={person.name}>{person.name}</div>;
        })}
      </div>
    </div>
  );
};

export default App;
