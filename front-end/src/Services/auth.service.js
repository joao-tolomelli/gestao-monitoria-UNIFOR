import axios from "axios";

const login = async (credentials) => {
  return axios.post("http://localhost:3000/api/login", credentials);
};

export default { login };
