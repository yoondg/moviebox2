import React from 'react'
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

const TopRatedMovieSlide = () => {
  const {data , isLoading, isError, error} = useUpcomingMoviesQuery();
  // console.log('인기순위영화',data);
  //로딩상태
  if(isLoading) return <h1>로딩중</h1>
  //에러상태
  if(isError) return <h1>{error.message}</h1>
  //데이터 유효성
  if(!data||!data.results||data.results.length===0) return <div>데이터없습니다</div>
  return (
    <div>
      <MovieSlider title="곧 스크린에서 만나요" subTitle="요즘 대세는 이거지! 화제의 🎬 영화들, 지금 바로 만나보세요" movies={data.results}/>
    </div>
  )
}

export default TopRatedMovieSlide