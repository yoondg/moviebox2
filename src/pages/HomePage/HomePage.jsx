import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
import PopularTVSlide from "./components/PopularTVSlide/PopularTVSlide";
import TopRatedTVSlide from "./components/TopRatedTVSlide/TopRatedTVSlide";
import AiringTodayTVSlide from "./components/AiringTodayTVSlide/AiringTodayTVSlide";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <div style={pageStyle}>
      {/* 영화 섹션 */}
      <Banner />
      <Container>
        <h1 style={sectionTitleStyle}>영화</h1>
        <h2 style={slideTitleStyle}>지금 가장 핫한 영화</h2>
        <PopularMovieSlide />
        <TopRatedMovieSlide />
        <UpcomingMovieSlide />
      </Container>

      {/* TV 프로그램 섹션 */}
      <Container>
        <h1 style={sectionTitleStyle}>TV 프로그램</h1>
        <h2 style={slideTitleStyle}>지금 가장 핫한 TV 프로그램</h2>
        <PopularTVSlide />
        <TopRatedTVSlide />
        <AiringTodayTVSlide />
      </Container>
    </div>
  );
};

// 페이지 전체 스타일
const pageStyle = {
  backgroundColor: "#0D1117",
  color: "#FFFFFF", 
  padding: "2rem 0",
};

// 섹션 제목 스타일
const sectionTitleStyle = {
  
  fontSize: "2.5rem",
  fontWeight: "bold",
  margin: "3rem 0 1rem",
  color: "#ffffff",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
};

// 슬라이드 제목 스타일
const slideTitleStyle = {
  fontSize: "1.8rem",
  fontWeight: "600",
  margin: "0 0 2rem",
  color: "#b3c7f9",
};

export default HomePage;
