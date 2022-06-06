import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "392010293" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPN, setPN] = useState("");

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
  };

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleOnChangePN = (event) => {
    setPN(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => {
          return (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
