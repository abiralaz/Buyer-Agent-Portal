import api from './axios';

export const getFavourites = async () => {
    const response = await api.get('/favourite');
    return response.data;
};

export const addFavourite = async (propertyId) => {
    const response = await api.post(`/favourite/${propertyId}`);
    return response.data;
};

export const removeFavourite = async (propertyId) => {
    const response = await api.delete(`/favourite/${propertyId}`);
    return response.data;
};