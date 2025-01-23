import React from "react";
import { useAiringTodayTVShowsQuery } from "../../../../hooks/useAiringTodayTVShowsQuery";
import TvSlider from "../../../../common/TvSlider/TvSlider";

const AiringTodayTVSlide = () => {
  const { data, isLoading, isError, error } = useAiringTodayTVShowsQuery();

  if (isLoading) {
    return <h1>로딩 중...</h1>;
  }

  if (isError) {
    return <h1>오류 발생: {error.message}</h1>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <h1>오늘 방영 중인 TV 프로그램 데이터가 없습니다.</h1>;
  }

  return (
    <div>
      <TvSlider
        title="오늘 방영 중인 TV 프로그램"
        subTitle="오늘 방영되는 인기 TV 프로그램을 확인하세요! 📺"
        shows={data.results}
      />
    </div>
  );
};

export default AiringTodayTVSlide;
