import axios from 'axios';

const BASE_URL = 'http://localhost:3000/employees';

export const fetchEmployees = async (cafe) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: { cafe },
  });
  return response.data;
};

export const addEmployee = async (employeeData) => {
  const response = await axios.post(`${BASE_URL}`, employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
