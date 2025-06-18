import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

function getAll() {
  return axios.get(baseUrl).then((res) => res.data);
}
function create(personObject) {
  return axios.post(baseUrl, personObject).then((res) => res.data);
}
function deletePerson(id) {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
}
function update(id, personObject) {
  return axios.put(`${baseUrl}/${id}`, personObject).then((res) => res.data);
}
export default {
  getAll,
  create,
  deletePerson,
  update,
};
