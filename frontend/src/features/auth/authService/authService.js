import axios from "axios";

const API_URL = "http://localhost:3001/v1/api/signup";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (userData) => {
  const response = await axios.post("http://localhost:3001/v1/api/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
};

const serviceAuth = {
  register,
  login,
  logout,
};

export default serviceAuth;
