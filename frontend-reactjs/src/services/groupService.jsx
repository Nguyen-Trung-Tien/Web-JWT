import axios from "../setup/axios";

export const handleGetAllGroup = () => {
  return axios.get(`/group/show`);
};
