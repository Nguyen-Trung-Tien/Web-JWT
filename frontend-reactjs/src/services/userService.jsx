import axios from "../setup/axios";

export const handleRegisterUser = (
  email,
  phoneNumber,
  username,
  password,
  confirmPassword
) => {
  return axios.post(`/register`, {
    email,
    phoneNumber,
    username,
    password,
    confirmPassword,
  });
};

export const handleLoginUser = (valueLogin, password) => {
  return axios.post(`/login`, { valueLogin, password });
};

export const fetchAllUser = (page, limit) => {
  return axios.get(`/user/show?page=${page}&limit=${limit}`);
};

export const handlerCreateUser = (userData) => {
  return axios.post(`/user/create`, { ...userData });
};

export const handlerUpdateUser = (userData) => {
  return axios.put(`/user/update`, { ...userData });
};

export const handlerDeleteUser = (user) => {
  return axios.delete(`/user/delete`, { data: { id: user.id } });
};
