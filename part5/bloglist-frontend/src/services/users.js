import axios from "axios";
const baseUrl = "/api/users";

const getByID = (url) => {
  const request = axios.get(baseUrl + url);
  return request.then((response) => response.data.name);
};

export default { getByID };
