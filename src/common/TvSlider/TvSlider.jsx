import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./TvSlider.style.css"; // TV 슬라이더 전용 스타일
import TvCard from "../TvCard/TvCard";
import { Container } from "react-bootstrap";

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

const TvSlider = ({ title, subTitle, shows }) => {
  return (
    <Container className="my-5">
      <div className="tv-carousel-container">
        <h2 className="tv-slider-title">{title}</h2>
        <p className="tv-slider-subtitle">{subTitle}</p>
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
          {shows.map((show, index) => (
            <TvCard show={show} key={index} />
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default TvSlider;
