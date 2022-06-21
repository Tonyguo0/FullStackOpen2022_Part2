import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPeople = () => {
  let request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (newPerson) => {
  let request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const exportObjects = { getAllPeople, addPerson };

export default exportObjects;
