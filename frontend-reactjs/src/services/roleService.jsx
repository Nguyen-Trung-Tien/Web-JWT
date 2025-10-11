import axios from "../setup/axios";

export const handleCreateRole = (role) => {
  return axios.post(`/role/create`, [...role]);
};
