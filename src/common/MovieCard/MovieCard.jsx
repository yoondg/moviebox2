import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import './MovieCard.style.css'

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`); // 클릭 시 상세 페이지로 이동
  };

  const showGenre = (genreIdList = []) => {
    if (!genreData) return []; // genreData가 없으면 빈 배열 반환
    return genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : "알 수 없음"; // genreObj가 없으면 기본값 반환
    });
  };

  const title = movie.title || movie.name || "제목 없음"; // 영화 또는 TV 제목 처리
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
    : "https://via.placeholder.com/600x900?text=No+Image"; // 기본 이미지
  const vote = movie.vote_average ? Math.round(movie.vote_average * 10) : "N/A";

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div
        className="movie-poster"
        style={{
          backgroundImage: `url(${poster})`,
        }}
      >
        <div className="movie-score">
          <span>{vote}%</span>
        </div>
      </div>
      <div className="movie-details">
        <h4 className="movie-title">{title}</h4>
        <div>
          {showGenre(movie.genre_ids).map((genre, index) => (
            <span className="genre-badge" key={`${genre}-${index}`}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
