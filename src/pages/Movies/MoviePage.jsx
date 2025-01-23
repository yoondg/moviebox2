import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";
import { Container, Form, Row, Col, Pagination } from "react-bootstrap";

const MoviePage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || ""; // URL에서 검색어 가져오기
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });

  const [genre, setGenre] = useState(""); // 선택된 장르
  const [sortOrder, setSortOrder] = useState("desc"); // 정렬 순서 (desc 또는 asc)
  const [sortBy, setSortBy] = useState("popularity"); // 정렬 기준 (popularity, vote_average 등)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 12; // 한 페이지에 표시할 항목 수 (4열 × 3줄)

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생: {error.message}</p>;

  // 영화 데이터
  let movies = data?.results || [];

  // 장르별 필터링
  if (genre) {
    movies = movies.filter((movie) => movie.genre_ids.includes(Number(genre)));
  }

  // 정렬
  movies.sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (sortOrder === "asc") {
      return valueA - valueB; // 오름차순
    } else {
      return valueB - valueA; // 내림차순
    }
  });

  // 현재 페이지 데이터
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center">{keyword ? `"${keyword}" 검색 결과` : "인기 영화"}</h1>

      {/* 필터 및 정렬 옵션 */}
      <Row className="mb-4 align-items-center">
        <Col md={4}>
          <Form.Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">모든 장르</option>
            <option value="28">액션</option>
            <option value="35">코미디</option>
            <option value="18">드라마</option>
            <option value="10749">로맨스</option>
            <option value="878">SF</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">인기 순</option>
            <option value="vote_average">평점 순</option>
            <option value="release_date">개봉일 순</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </Form.Select>
        </Col>
      </Row>

      {/* 영화 카드 표시 */}
      <Row>
        {paginatedMovies.map((movie) => (
          <Col xs={12} sm={6} md={3} key={movie.id} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default MoviePage;
