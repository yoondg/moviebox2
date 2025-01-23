import { useQuery } from "@tanstack/react-query";
import api from "../utils/app";

const fetchPopularTVShows = async () => {
  const response = await api.get(`/tv/popular?language=ko-KR`);
  return response.data;
};

export const usePopularTVShowsQuery = () => {
  return useQuery({
    queryKey: ["popular-tv-shows"],
    queryFn: fetchPopularTVShows,
  });
};
