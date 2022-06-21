import { useState, useEffect } from "react";
import personsService from "./services/persons";

const Filter = ({ newFilter, Change }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={Change} />
    </div>
  );
};

const PersonForm = ({ Name, PN, ChangeName, ChangePN, handleButton }) => {
  return (
    <form>
      <div>
        name: <input value={Name} onChange={ChangeName} />
      </div>
      <div>
        number <input value={PN} onChange={ChangePN} />
      </div>
      <div>
        <button onClick={handleButton} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ Filter, List }) => {
  const filteredpersons =
    Filter === ""
      ? List
      : List.filter((person) =>
          person.name.toLowerCase().includes(Filter.toLowerCase())
        );
  return (
    <div>
      {filteredpersons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPN, setPN] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personsService.getAllPeople().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleAddButton = (event) => {
    event.preventDefault();
    // compare person's name existing in the array with newName if newName already in persons array send out alert ${newName} is already added to phone book
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phone book`);
      return;
    }
    const tempPerson = { name: newName, number: newPN };

    personsService.addPerson(tempPerson).then((initialPerson) => {
      setPersons(persons.concat(initialPerson));
      setNewName("");
      setPN("");
      setNewFilter("");
    });
  };
  useEffect(()=>{
    console.log(persons)

  },[persons])

  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleOnChangePN = (event) => {
    setPN(event.target.value);
  };

  const handleOnChangeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} Change={handleOnChangeFilter} />
      <h2>add a new</h2>

      <PersonForm
        Name={newName}
        PN={newPN}
        ChangeName={handleOnChangeName}
        ChangePN={handleOnChangePN}
        handleButton={handleAddButton}
      />

      <h2>Numbers</h2>
      <Persons Filter={newFilter} List={persons} />
    </div>
  );
};

export default App;
