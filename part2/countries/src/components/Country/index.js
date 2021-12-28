import axios from "axios";
import { useState, useEffect } from "react";
const api_key = process.env.REACT_APP_WEATHER_API;

export const Country = ({ country }) => {
  const [languages, setLanguages] = useState(Object.values(country.languages));
  const [name, setName] = useState(country.name.common);
  const [temperature, setTemperature] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setTemperature(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>population: {country.population}</p>
      <h3>languages: </h3>
      <ul>
        {languages.map((l, index) => (
          <li key={index}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${name} flag`} />
      <h3>Weather in {name}</h3>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <p>temperature: {temperature.main.temp}</p>
          <p>wind: {temperature.wind.speed} mps</p>
        </>
      )}
    </div>
  );
};
