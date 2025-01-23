import { useQuery } from "@tanstack/react-query";
import api from "../utils/app";

const fetchAiringTodayTVShows = async () => {
  const response = await api.get(`/tv/airing_today?language=ko-KR`);
  return response.data;
};

export const useAiringTodayTVShowsQuery = () => {
  return useQuery({
    queryKey: ["airing-today-tv-shows"],
    queryFn: fetchAiringTodayTVShows,
  });
};
