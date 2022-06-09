import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div> Too many matches, specify another filter</div>;
  } else if (countries.length > 1 && countries.length <= 10) {
    return countries.map((country) => {
      return <div key={country.name.common}>{country.name.common}</div>;
    });
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          capital {country.capital[0]}
          <br />
          area {country.area}
        </div>
        <div>
          <h4>languages:</h4>
          <ul>
            {Object.keys(country.languages).map((keyvalue) => {
              return <li key={keyvalue}>{country.languages[keyvalue]}</li>;
            })}
          </ul>
          <div>
            <img
              src={country.flags.png}
              alt={country.name.common}
              width="128"
              height="128"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No country found, please check the server</div>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredcountry, setFilteredCountry] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setFilteredCountry(response.data);
    });
  }, []);

  const handleOnSearchCountry = (event) => {
    setSearch(event.target.value);
    // console.log(search);
    const filteredcountries =
      search === ""
        ? countries
        : countries.filter((country) => {
            // console.log(country.name.common);
            return country.name.common
              .toLowerCase()
              .includes(search.toLowerCase());
          });
    // console.log("filteredcountries", filteredcountries);
    setFilteredCountry(filteredcountries);
  };
  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleOnSearchCountry} />
        {console.log(countries)}
        <Countries countries={filteredcountry} />
      </div>
    </div>
  );
};

export default App;
