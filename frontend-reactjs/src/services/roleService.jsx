import axios from "../setup/axios";

export const handleCreateRole = (role) => {
  return axios.post(`/role/create`, [...role]);
};

export const handleGetAllRole = () => {
  return axios.get(`/role/show`);
};

export const handleDeleteRole = (role) => {
  return axios.delete(`/role/delete`, { data: { id: role.id } });
};
