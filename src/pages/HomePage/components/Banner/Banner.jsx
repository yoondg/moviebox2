import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Badge from 'react-bootstrap/Badge';
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" style={{ width: "4rem", height: "4rem" }}>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return (
      <h1>
        <Alert variant="danger">
          <Alert.Heading>에러 발생</Alert.Heading>
          <p>{error?.message || "An unknown error occurred."}</p>
        </Alert>
      </h1>
    );
  }

  const movie = data.results[0];
  const cutText = movie.overview.length > 50;
  const shortDescription = cutText ? movie.overview.slice(0, 50) + "..." : movie.overview;

  const genreMap = {
    28: '액션',
    12: '모험',
    16: '애니메이션',
    35: '코미디',
    80: '범죄',
    99: '다큐멘터리',
    18: '드라마',
    10751: '가족',
    14: '판타지',
    36: '역사',
    27: '공포',
    10402: '음악',
    9648: '미스터리',
    10749: '로맨스',
    878: 'SF',
    10770: 'TV 영화',
    53: '스릴러',
    10752: '전쟁',
    37: '서부',
  };
  const genreNames = movie.genre_ids.map((id) => genreMap[id]);

  return (
    <div
      style={{
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding:0,
        backgroundImage: `
          linear-gradient(
            to left,
            rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.9)  
          ),
          url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.backdrop_path})
        `,
      }}
    >
      <div className="banner-container">
  <div className="banner-content">
    <h2>{movie.title}</h2>
    <div className="badge-container">
      {genreNames.length > 0
        ? genreNames.map((genre, index) => (
            <span key={index} className="badge">{genre}</span>
          ))
        : <span className="badge">없음</span>}
    </div>
    <p className="description">
      {isExpanded || !cutText ? movie.overview : shortDescription}
      {!isExpanded && cutText && (
        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(true);
          }}
        >
          더보기
        </a>
      )}
    </p>
    <div className="details">
      <p>개봉일: <span>{movie.release_date}</span></p>
      <p>평점: <span>{movie.vote_average.toFixed(1)}</span></p>
      <p>관람자수: <span>{movie.popularity.toFixed(0)}</span></p>
      <p>관람연령: <span>{movie.adult ? "🔞 성인용" : "✅ 일반"}</span></p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Banner;
