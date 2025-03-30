import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

export const getNews = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addNews = async (news) => {
    const response = await axios.post(API_URL, news);
    return response.data;
};

export const updateNews = async (id, news) => {
    const response = await axios.put(`${API_URL}/${id}`, news);
    return response.data;
};

export const deleteNews = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
