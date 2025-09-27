import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const handleRegisterUser = (
  email,
  phoneNumber,
  username,
  password,
  confirmPassword
) => {
  return axios.post(`${baseURL}/register`, {
    email,
    phoneNumber,
    username,
    password,
    confirmPassword,
  });
};

export const handleLoginUser = (valueLogin, password) => {
  return axios.post(`${baseURL}/login`, { valueLogin, password });
};
