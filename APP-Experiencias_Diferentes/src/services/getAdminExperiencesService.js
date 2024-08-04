import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAdminExperiencesService = async (token) => {
  const response = await axios.get(`${API_URL}/api/admin/experiences`, {
    params: { token }
  });
  return response.data;
};

export default getAdminExperiencesService;
