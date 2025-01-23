import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// TV 프로그램 관련 API 함수 추가
export const fetchPopularTVShows = async () => {
  const response = await api.get(`/tv/popular?language=ko-KR`);
  return response.data;
};

export const fetchTopRatedTVShows = async () => {
  const response = await api.get(`/tv/top_rated?language=ko-KR`);
  return response.data;
};

export const fetchAiringTodayTVShows = async () => {
  const response = await api.get(`/tv/airing_today?language=ko-KR`);
  return response.data;
};

export default api;
