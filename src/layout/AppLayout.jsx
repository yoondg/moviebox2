import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './Footer';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppLayout = () => {
  const [hover, setHover] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`); // URL의 쿼리 파라미터 업데이트
    setKeyword(""); // 검색창 초기화
  };

  const styles = {
    navbar: {
      backgroundColor: '#0f172a',
      padding: '10px 20px',
      // position:'absolute',
      // zIndex:'999',
      // width:'100%'
    },
    navLink: {
      color: '#ffffff',
      marginRight: '15px',
      textDecoration: 'none', // 링크 기본 스타일 제거
    },
    searchInput: {
      backgroundColor: '#1f2937',
      border: '1px solid #ffffff',
      color: '#ffffff',
      borderRadius: '5px 0 0 5px',
      fontSize: '14px',
      padding: '10px 12px',
      height: '40px',
      marginRight: '0',
    },
    button: {
      borderColor: '#ffffff',
      color: hover ? '#1e5a80' : '#ffffff',
      fontWeight: '600',
      padding: '0 15px',
      fontSize: '14px',
      height: '40px',
      borderRadius: '0 5px 5px 0',
      whiteSpace: 'nowrap',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <>
      <Navbar expand="lg" style={styles.navbar}>
        <Container>
          {/* 로고 및 브랜드 */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              width="40"
              height="40"
              style={{ marginRight: '10px' }}
            />
          </Navbar.Brand>

          {/* 토글 버튼 */}
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{
              borderColor: '#ffffff',
              color: '#ffffff',
            }}
          >
            <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
          </Navbar.Toggle>

          {/* 내비게이션 메뉴 */}
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/" style={styles.navLink}>
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/movies" style={styles.navLink}>
                MOVIES
              </Nav.Link>
              <Nav.Link as={Link} to="/mypage" style={styles.navLink}>
                MYPAGE
              </Nav.Link>
            </Nav>

            {/* 검색창 */}
            <Form className="d-flex align-items-center" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="영화, 인물 검색..."
                aria-label="Search"
                style={styles.searchInput}
                value = {keyword}
                onChange={(event)=>setKeyword(event.target.value)}
              />
              <Button
                variant="outline-light"
                style={styles.button}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                type="submit"
              >
                검색
              </Button>
            </Form>
            <style>
              {`
                .form-control::placeholder {
                  color: #9ca3af;
                  opacity: 1;
                }
              `}
            </style>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet /> {/* 하위 라우트 렌더링 */}
      <Footer />
    </>
  );
};

export default AppLayout;
