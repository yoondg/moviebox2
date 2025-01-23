import React from 'react'
import {useTopRatedMoviesQuery} from '../../../../hooks/useTopRatedMovies'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
const TopRatedMovieSlide = () => {
  const {data , isLoading, isError, error} = useTopRatedMoviesQuery();
  // console.log('인기순위영화',data);
  //로딩상태
  if(isLoading) return <h1>로딩중</h1>
  //에러상태
  if(isError) return <h1>{error.message}</h1>
  //데이터 유효성
  if(!data||!data.results||data.results.length===0) return <div>데이터없습니다</div>
  return (
    <div>
      <MovieSlider title="명화만 모았습니다" subTitle="뮤빅픽! 모두가 인정한 레전드🌟 영화들, 100% 찐 명작만 골라봤어요" movies={data.results}/>
    </div>
  )
}

export default TopRatedMovieSlide