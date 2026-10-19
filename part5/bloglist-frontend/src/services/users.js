import axios from "axios";
const baseUrl = "/api/users";

const getByID = async (url) => {
  const response = await axios.get(baseUrl + "/" + url);
  return response.data.name;
};

export default { getByID };
