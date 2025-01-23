import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Container, Row, Col, Card, Badge, Button, Modal } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import api from "../../utils/app";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터
  const [cast, setCast] = useState([]); // 출연진 정보
  const [director, setDirector] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // 영화 세부 정보
        const movieResponse = await api.get(`/movie/${id}?language=ko-KR`);
    
        // 출연진 정보
        const creditsResponse = await api.get(`/movie/${id}/credits?language=ko-KR`);
    
        // 비디오 정보
        const videosResponse = await api.get(`/movie/${id}/videos?language=ko-KR`);
    
        // 리뷰 정보
        const reviewsResponse = await api.get(`/movie/${id}/reviews?language=ko-KR`);
    
        setMovie(movieResponse.data);
    
        // 리뷰 데이터 처리
        if (reviewsResponse.data.results.length > 0) {
          setReviews(reviewsResponse.data.results); // 한국어 리뷰
        } else {
          // 영어 리뷰로 fallback
          const fallbackResponse = await api.get(`/movie/${id}/reviews?language=en-US`);
          setReviews(fallbackResponse.data.results);
        }
    
        // 출연진 데이터
        setCast(creditsResponse.data.cast.slice(0, 6)); // 상위 6명의 배우만 표시
    
        // 감독 정보
        const directorInfo = creditsResponse.data.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorInfo);
    
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
    

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!movie) {
    return <p>영화 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div
      className="movie-detail-page"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      <Container className="my-5 py-5 movie-detail-container">
        <Row>
          {/* 포스터 */}
          <Col md={4}>
            <Card className="movie-poster-card shadow-lg">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
              />
            </Card>
          </Col>

          {/* 상세 정보 */}
          <Col md={8}>
            <h1 className="movie-title">{movie.title}</h1>
            <h2 className="movie-tagline text-secondary">{movie.tagline || "표어 정보 없음"}</h2>
            <p className="movie-overview">{movie.overview}</p>
            <div className="movie-genres mb-3">
              {movie.genres.map((genre) => (
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
                onClick={() => setShowModal(true)}
              >
                <FaPlay className="me-2" /> 트레일러 보기
              </Button>
            )}

            {/* 상세 정보 */}
            <div className="movie-details mt-4">
              <Row>
                <Col>
                  <strong className="text-secondary">상영 시간:</strong> {movie.runtime}분
                </Col>
                <Col>
                  <strong className="text-secondary">제작비:</strong> ${movie.budget.toLocaleString() || "정보 없음"}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong className="text-secondary">수익:</strong> ${movie.revenue.toLocaleString() || "정보 없음"}
                </Col>
                <Col>
                  {director && (
                    <>
                      <strong className="text-secondary">감독:</strong> {director.name}
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* 출연진 섹션 */}
        <div className="mt-5">
          <h3 className="text-primary">출연진</h3>
          <Row>
            {cast.length > 0 ? (
              cast.map((actor) => (
                <Col xs={6} md={4} lg={2} key={actor.id} className="mb-4">
                  <Card className="shadow-sm bg-dark text-light">
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
                      <Card.Title className="text-center">{actor.name}</Card.Title>
                      <Card.Text className="text-center">{actor.character}</Card.Text>
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
          <h3 className="text-primary">리뷰</h3>
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

export default MovieDetailPage;
