import { useState } from "react";

export const Country = ({ country }) => {
  const [languages, setLanguages] = useState(Object.values(country.languages));

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>population: {country.population}</p>
      <h3>languages: </h3>
      <ul>
        {languages.map((l, index) => (
          <li key={index}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  );
};
