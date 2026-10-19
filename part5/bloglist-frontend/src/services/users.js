import axios from "axios";
const baseUrl = "/api/login";

const getByID = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getByID };
