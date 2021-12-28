import { useState, useEffect } from "react";
import axios from "axios";
import { Countries } from "./components/Countries";

const URL = "https://restcountries.com/v3.1/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = () => {
    if (filter.length === 0) {
      return countries;
    }

    let tempCountries = [];

    countries.forEach((country) => {
      if (country.name.common.toLowerCase().includes(filter.toLowerCase())) {
        tempCountries.push(country);
      }
    });

    return tempCountries;
  };

  return (
    <div>
      find countries: <input value={filter} onChange={handleFilter} />
      <Countries data={filteredData()} />
    </div>
  );
}

export default App;
