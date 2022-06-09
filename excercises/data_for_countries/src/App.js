import { useState, useEffect } from "react";
import axios from "axios";

// const Filter = ({ newFilter, Change }) => {
//   return (
//     <div>
//       filter shown with <input value={newFilter} onChange={Change} />
//     </div>
//   );
// };

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const Filter = () => {
    countries.filter((country) => country.name.common.contains(filter));
  };
  // const handleAddButton = (event) => {
  //   event.preventDefault();
  //   // compare person's name existing in the array with newName if newName already in persons array send out alert ${newName} is already added to phone book
  //   if (persons.find((person) => person.name === newName)) {
  //     alert(`${newName} is already added to phone book`);
  //     return;
  //   }
  //   const tempObj = { name: newName, number: newPN };
  //   setPersons(persons.concat(tempObj));
  //   setNewName("");
  //   setPN("");
  //   setNewFilter("");
  // };

  const handleOnSearchCountry = (event) => {
    setFilter(event.target.value);
    Filter();
  };
  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleOnSearchCountry} />
      </div>
    </div>
  );
};

export default App;
