import api from './axios';

export const getProperties = async () => {
    const response = await api.get('/property');
    return response.data;
};

export const createProperty = async (payload) => {
    const response = await api.post('/property', payload);
    return response.data;
};