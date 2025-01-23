import { useQuery } from "@tanstack/react-query";
import api from "../utils/app";

// 최고 평점 TV 프로그램 가져오기
const fetchTopRatedTVShows = async () => {
  const response = await api.get(`/tv/top_rated?language=ko-KR`);
  return response.data;
};

export const useTopRatedTVShowsQuery = () => {
  return useQuery({
    queryKey: ["top-rated-tv-shows"],
    queryFn: fetchTopRatedTVShows,
  });
};
