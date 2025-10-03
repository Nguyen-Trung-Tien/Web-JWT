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

export const fetchAllUser = (page, limit) => {
  return axios.get(`${baseURL}/user/show?page=${page}&limit=${limit}`);
};

export const handlerCreateUser = (userData) => {
  return axios.post(`${baseURL}/user/create`, { ...userData });
};

export const handlerDeleteUser = (user) => {
  return axios.delete(`${baseURL}/user/delete`, { data: { id: user.id } });
};
