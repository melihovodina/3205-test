import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface UrlModel {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount?: number;
}

export interface UrlInfo {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount?: number;
}

export const shortUrl = async (url: string): Promise<UrlModel> => {
  try {
    const response = await axios.post<UrlModel>(`${API_BASE_URL}/shorten`, { url });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const redirectUrl = async (shortUrl: string): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${shortUrl}`, { responseType: 'text' });
    window.location.href = response.request.responseURL;
  } catch (error) {
    throw error;
  }
};

export const getUrlInfo = async (shortUrl: string): Promise<UrlInfo> => {
  try {
    const response = await axios.get<UrlInfo>(`${API_BASE_URL}/info/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUrls = async (): Promise<UrlInfo[]> => {
  try {
    const response = await axios.get<UrlInfo[]>(`${API_BASE_URL}/info`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUrl = async (shortUrl: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${shortUrl}`);
  } catch (error) {
    throw error;
  }
};

export const getAnalytics = async (shortUrl: string): Promise<{ clickCount: number; recentIps: string[] }> => {
  try {
    const response = await axios.get<{ clickCount: number; recentIps: string[] }>(`${API_BASE_URL}/analytics/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};