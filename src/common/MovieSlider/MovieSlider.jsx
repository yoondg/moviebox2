import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.style.css'; // CSS 파일 import
import MovieCard from '../MovieCard/MovieCard';
import { Container, Row, Col } from 'react-bootstrap';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieSlider = ({ title, subTitle, movies }) => {
  return (
    <Container className='my-5'>
      <div className="carousel-container">
        <h2 className="movie-slider-title">{title}</h2>
        <p className="movie-slider-subtitle">{subTitle}</p>
        <Carousel
          swipeable
          draggable
          responsive={responsive}
          infinite
          autoPlaySpeed={3000}
          keyBoardControl
          itemClass="carousel-item-padding-40-px"
          renderDotsOutside
        >
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default MovieSlider;
