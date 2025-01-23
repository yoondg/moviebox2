import { useQuery } from "react-query";
import axios from "axios";

export const useTvQuery = (tvId) => {
  return useQuery(["tv", tvId], async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=YOUR_API_KEY`
    );
    return data;
  });
};