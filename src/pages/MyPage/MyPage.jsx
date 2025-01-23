import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import api from "../../utils/app"; // TMDB API 사용

const MyPage = () => {
  const [likedMovies, setLikedMovies] = useState([]); // 찜한 영화 목록
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "user@example.com",
    profileImage:
      "https://img.khan.co.kr/news/2010/02/01/3-2.jpg", // 기본 프로필 이미지
  });

  const fetchRandomMovies = async () => {
    try {
      const response = await api.get(`/movie/popular?language=ko-KR&page=1`);
      const randomMovies = response.data.results
        .sort(() => 0.5 - Math.random())
        .slice(0, 2); // 랜덤으로 2개의 영화 선택
      setLikedMovies(randomMovies);
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const handleRemoveMovie = (id) => {
    setLikedMovies(likedMovies.filter((movie) => movie.id !== id));
  };

  const handleUpdateInfo = (event) => {
    event.preventDefault();
    setShowModal(false);
    alert("정보가 업데이트되었습니다!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <Container className="my-5" style={{ color: "#ffffff", backgroundColor: "#1f2937", padding: "20px", borderRadius: "10px" }}>
      <h1 className="text-center text-primary">내 정보</h1>

      {/* 사용자 정보 */}
      <Card className="mb-4 shadow-sm" style={{ backgroundColor: "#2d3748", color: "#ffffff" }}>
        <Card.Body className="d-flex align-items-center">
          <img
            src={userInfo.profileImage}
            alt="프로필"
            style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
          />
          <div>
            <p>
              <strong>이름:</strong> {userInfo.name}
            </p>
            <p>
              <strong>이메일:</strong> {userInfo.email}
            </p>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              정보 수정
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* 찜한 영화 목록 */}
      <h2 className="text-center text-secondary">찜한 영화</h2>
      {likedMovies.length === 0 ? (
        <p className="text-center text-light">찜한 영화가 없습니다.</p>
      ) : (
        <Row>
          {likedMovies.map((movie) => (
            <Col xs={12} sm={6} md={4} key={movie.id} className="mb-4">
              <Card className="shadow-sm" style={{ backgroundColor: "#2d3748", color: "#ffffff" }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveMovie(movie.id)}
                  >
                    삭제
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* 사용자 정보 수정 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateInfo}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="profileImage" className="mb-3">
              <Form.Label>프로필 이미지 URL</Form.Label>
              <Form.Control
                type="text"
                name="profileImage"
                value={userInfo.profileImage}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              저장
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MyPage;
