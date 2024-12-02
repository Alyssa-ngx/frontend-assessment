import axios from 'axios';

const BASE_URL = 'http://localhost:3000/cafes';

export const fetchCafes = async (location) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: { location },
  });
  return response.data;
};

export const addCafe = async (cafeData) => {
  const response = await axios.post(`${BASE_URL}`, cafeData);
  return response.data;
};

export const updateCafe = async (id, cafeData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, cafeData);
  return response.data;
};

export const deleteCafe = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
