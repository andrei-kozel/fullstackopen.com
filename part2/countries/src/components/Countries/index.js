import { useState, useEffect } from "react";
import { Country } from "../Country";

export const Countries = ({ data }) => {
  const [countries, setCountries] = useState(data);

  useEffect(() => {
    setCountries(data);
  }, [data]);

  const showInfo = (country) => {
    setCountries([country]);
  };

  if (countries.length >= 10) {
    return <p>Too many macthes, specify another filter.</p>;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country, index) => {
        return (
          <div key={index}>
            <p>
              {country.name.common}{" "}
              <button onClick={() => showInfo(country)}>show</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};
