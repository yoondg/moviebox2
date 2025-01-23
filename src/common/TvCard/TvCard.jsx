import React from "react";
import "./TvCard.style.css"; // TV 카드 전용 스타일
import { useNavigate } from "react-router-dom";

const TvCard = ({ show }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tv/${show.id}`); // TV 프로그램 ID를 포함한 URL로 이동
  };

  const title = show.name || "제목 없음";
  const poster = show.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${show.poster_path}`
    : "https://via.placeholder.com/600x900?text=No+Image"; // 포스터 기본값
  const vote = show.vote_average ? Math.round(show.vote_average * 10) : "N/A";

  return (
    <div className="tv-card" onClick={handleCardClick}>
      <div
        className="tv-poster"
        style={{
          backgroundImage: `url(${poster})`,
        }}
      >
        <div className="tv-score">
          <span>{vote}%</span>
        </div>
      </div>
      <div className="tv-details">
        <h4 className="tv-title">{title}</h4>
        <p className="tv-date">{show.first_air_date || "방영일 정보 없음"}</p>
      </div>
    </div>
  );
};


export default TvCard;
