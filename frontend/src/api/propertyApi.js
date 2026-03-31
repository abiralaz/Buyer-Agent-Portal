import api from './axios';

export const getProperties = async () => {
    const response = await api.get('/property');
    return response.data;
};