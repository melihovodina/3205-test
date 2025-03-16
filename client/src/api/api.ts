import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const shortUrl = async (url: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shorten`, { url });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const redirectUrl = async (shortUrl: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUrlInfo = async (shortUrl: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/info/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUrl = async (shortUrl: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAnalytics = async (shortUrl: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analytics/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};