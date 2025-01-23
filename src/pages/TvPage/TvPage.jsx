import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchTvQuery } from "../../hooks/useSearchTv";
import TvCard from "../../components/Tvs/TvCard";
import { Container, Form, Row, Col, Pagination } from "react-bootstrap";

const TvPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || ""; // URL에서 검색어 가져오기
  const { data, isLoading, isError, error } = useSearchTvQuery({ keyword });

  const [genre, setGenre] = useState(""); // 선택된 장르
  const [sortOrder, setSortOrder] = useState("desc"); // 정렬 순서 (desc 또는 asc)
  const [sortBy, setSortBy] = useState("popularity"); // 정렬 기준
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 12; // 한 페이지에 표시할 항목 수

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생: {error.message}</p>;

  // TV 데이터 필터링 및 정렬
  let tvShows = data?.results || [];
  if (genre) {
    tvShows = tvShows.filter((tv) => tv.genre_ids.includes(Number(genre)));
  }
  tvShows.sort((a, b) => (sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]));

  // 현재 페이지 데이터
  const totalPages = Math.ceil(tvShows.length / itemsPerPage);
  const paginatedTvShows = tvShows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5">
      <h1 className="text-center">{keyword ? `"${keyword}" 검색 결과` : "인기 TV 프로그램"}</h1>

      {/* 필터 및 정렬 옵션 */}
      <Row className="mb-4 align-items-center">
        <Col md={4}>
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">모든 장르</option>
            <option value="10759">액션 & 어드벤처</option>
            <option value="16">애니메이션</option>
            <option value="35">코미디</option>
            <option value="18">드라마</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popularity">인기 순</option>
            <option value="vote_average">평점 순</option>
            <option value="first_air_date">최신 방영일 순</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </Form.Select>
        </Col>
      </Row>

      {/* TV 카드 표시 */}
      <Row>
        {paginatedTvShows.map((tv) => (
          <Col xs={12} sm={6} md={3} key={tv.id} className="mb-4">
            <TvCard tv={tv} />
          </Col>
        ))}
      </Row>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </Container>
  );
};

export default TvPage;
