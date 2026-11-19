import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export const getTravels = async (params = {}) => (await api.get('/travels', { params })).data;
export const createTravel = async (payload) => (await api.post('/travels', payload)).data;
export const updateTravel = async (id, payload) => (await api.put(`/travels/${id}`, payload)).data;
export const deleteTravel = async (id) => (await api.delete(`/travels/${id}`)).data;
