import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (person) => {
  const request = axios.post(baseUrl, person);
  return request.then((response) => response.data);
};

const deletePerson = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then((response) => response.data);
};

const updatePerson = (person) => {
  const request = axios
    .put(`${baseUrl}/${person.id}`, person)
    .catch((error) => console.log("update person error", error));
  return request.then((response) => response.data);
};

export default { getAll, deletePerson, addPerson, updatePerson };
