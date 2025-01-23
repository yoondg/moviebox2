import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider'; 

const PopularMovieSlide = () => {
  const{data, isLoading, isError, error}= usePopularMoviesQuery()
  if(isLoading){ return <h1>로딩중</h1> }
  if(isError){ return <h1>{error.message}</h1> }
  return (
    <div>
      <MovieSlider title='지금 놓치면 아쉬운 영화' subTitle='뮤빅픽! 모두가 인정한 레전드🌟 영화들, 100% 찐 명작만 골라봤어요' movies={data.results}></MovieSlider>
    </div>
  )
}

export default PopularMovieSlide