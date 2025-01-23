import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import api from "../../utils/app";
import "./TvDetailPage.style.css";

const TvDetailPage = () => {
  const { tvId } = useParams();
  const [tv, setTv] = useState(null);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터
  const [cast, setCast] = useState([]); // 출연진 정보
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        // TV 세부 정보
        const tvResponse = await api.get(`/tv/${tvId}?language=ko-KR`);

        // 출연진 정보
        const creditsResponse = await api.get(`/tv/${tvId}/credits?language=ko-KR`);

        // 비디오 정보
        const videosResponse = await api.get(`/tv/${tvId}/videos?language=ko-KR`);

        // 리뷰 정보
        const reviewsResponse = await api.get(`/tv/${tvId}/reviews?language=ko-KR`);

        setTv(tvResponse.data);

        // 리뷰 데이터 처리
        if (reviewsResponse.data.results.length > 0) {
          setReviews(reviewsResponse.data.results);
        } else {
          const fallbackResponse = await api.get(`/tv/${tvId}/reviews?language=en-US`);
          setReviews(fallbackResponse.data.results);
        }

        // 출연진 데이터
        setCast(creditsResponse.data.cast.slice(0, 6));

        // 트레일러 정보
        const trailerInfo = videosResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerInfo);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvDetails();
  }, [tvId]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!tv) {
    return <p>TV 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div
      className="movie-detail-page"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
      }}
    >
      <Container className="my-5 py-5 movie-detail-container">
        <Row>
          {/* 포스터 */}
          <Col md={4}>
            <Card className="movie-poster-card shadow-lg">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${tv.poster_path}`}
                alt={tv.name}
              />
            </Card>
          </Col>

          {/* 상세 정보 */}
          <Col md={8}>
            <h1 className="movie-title">{tv.name}</h1>
            <h2 className="movie-tagline text-secondary">{tv.tagline || "표어 정보 없음"}</h2>
            <p className="movie-overview">{tv.overview}</p>
            <div className="movie-genres mb-3">
              {tv.genres.map((genre) => (
                <Badge key={genre.id} className="text-primary bg-dark me-2 px-3 py-2">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* 트레일러 버튼 */}
            {trailer && (
              <Button
                variant="success"
                className="mt-3 btn-primary-text d-flex align-items-center"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank")}
              >
                <FaPlay className="me-2" /> 트레일러 보기
              </Button>
            )}

            <div className="movie-details mt-4">
              <Row>
                <Col>
                  <strong>첫 방영일:</strong> {tv.first_air_date || "정보 없음"}
                </Col>
                <Col>
                  <strong>평균 에피소드 런타임:</strong> {tv.episode_run_time[0] || "정보 없음"}분
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>언어:</strong> {tv.original_language.toUpperCase()}
                </Col>
                <Col>
                  <strong>평점:</strong> {tv.vote_average.toFixed(1) || "정보 없음"}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* 출연진 섹션 */}
        <div className="mt-5">
          <h3>출연진</h3>
          <Row>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <Col xs={6} md={4} lg={2} key={actor.id} className="mb-4">
                  <Card className="cast-card">
                    <Card.Img
                      variant="top"
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "https://via.placeholder.com/185x278?text=No+Image"
                      }
                      alt={actor.name}
                    />
                    <Card.Body>
                      <Card.Title className="cast-name">{actor.name}</Card.Title>
                      <Card.Text className="cast-character">{actor.character}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-warning">출연진 정보가 없습니다.</p>
            )}
          </Row>
        </div>

        {/* 리뷰 섹션 */}
        <div className="mt-5">
          <h3>리뷰</h3>
          {reviews.length > 0 ? (
            reviews.slice(0, 5).map((review) => (
              <Card className="mb-3 shadow-sm bg-dark text-light" key={review.id}>
                <Card.Body>
                  <Card.Title className="text-secondary">{review.author}</Card.Title>
                  <Card.Text>{review.content.slice(0, 300)}...</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-warning">리뷰가 없습니다.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TvDetailPage;
