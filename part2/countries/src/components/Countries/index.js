import { Country } from "../Country";

export const Countries = ({ data }) => {
  if (data.length >= 10) {
    return <p>Too many macthes, specify another filter.</p>;
  }

  if (data.length === 1) {
    return <Country country={data[0]} />;
  }

  return (
    <div>
      {data.map((country, index) => {
        return <p key={index}>{country.name.common}</p>;
      })}
    </div>
  );
};
