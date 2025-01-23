import React from "react";
import { useTopRatedTVShowsQuery } from "../../../../hooks/useTopRatedTVShowsQuery";
import TvSlider from "../../../../common/TvSlider/TvSlider";

const TopRatedTVSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedTVShowsQuery();

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
        title="최고 평점 TV 프로그램"
        subTitle="전 세계에서 인정받은 TV 프로그램을 만나보세요! ⭐"
        shows={data.results} // TV 데이터 전달
      />
    </div>
  );
};

export default TopRatedTVSlide;
