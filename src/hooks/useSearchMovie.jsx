import { useQuery } from "@tanstack/react-query";
import api from "../utils/app";

const fetchSearchMovie = async ({ keyword }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&language=ko-KR`) // 검색 API 호출
    : api.get(`/movie/popular?language=ko-KR`); // 기본 인기 영화 API 호출
};

export const useSearchMovieQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ['movie-search', keyword],
    queryFn: () => fetchSearchMovie({ keyword }),
    select: (result) => result.data, // 결과 데이터만 반환
  });
};
