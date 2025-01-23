import React from "react";
import { usePopularTVShowsQuery } from "../../../../hooks/usePopularTVShowsQuery";
import TvSlider from "../../../../common/TvSlider/TvSlider";

const PopularTVSlide = () => {
  const { data, isLoading, isError, error } = usePopularTVShowsQuery();

  if (isLoading) {
    return <h1>로딩 중...</h1>;
  }

  if (isError) {
    return <h1>오류 발생: {error.message}</h1>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <h1>데이터가 없습니다.</h1>;
  }

  return (
    <div>
      <TvSlider
        title="인기 TV 프로그램"
        subTitle="지금 가장 핫한 TV 프로그램을 만나보세요! 📺"
        shows={data.results} // TV 데이터 전달
      />
    </div>
  );
};

export default PopularTVSlide;
