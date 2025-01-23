import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const NotFoundPage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
    <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4} className="d-flex flex-column align-items-center">
            <img src="/images/notfound.png" alt="404" className="img-fluid mb-3" style={{ maxWidth: '100%' }} />
            <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: '600' }}>이런... 찾으시는 페이지가 없습니다.</h1>
            <p className="mb-3" style={{ fontSize: '1rem' }}>홈으로 돌아가거나 다른 길을 찾아보세요</p>
            <Button href="/" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--neutral-white)', fontWeight: '600', border: 'none' }}>Go Home</Button>
        </Col>
    </Row>
</Container>
);
}

export default NotFoundPage